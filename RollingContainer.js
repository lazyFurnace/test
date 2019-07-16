import React, {useEffect, useRef, useState, useMemo} from 'react';
import classNames from 'classnames';
import {isElectronApp} from '@/utils/utilities';

import './style.less';

const isPcClient = isElectronApp();

/**
 * @description 滑动功能组件
 * @param {Object} props
 * @typedef props
 * @param {React.Component} children React 组件子元素
 * @param {Number} learning 需要跳到的卡片位置
 * @param {String} listClassName 列表容器的 className
 * @param {String} rollingClassName 滚动组件的 className
 */
const RollingContainer = ({children, learning, listClassName, rollingClassName}) => {
  let timer;
  let throttle = false;
  const srcollContainer = useRef(null);
  const ulContainer = useRef(null);
  const [count, setCount] = useState([0, 0]);
  /**
   * @description 自动滚动到 learning 所在的专题
   */
  useEffect(() => {
    const height = window.document.body.clientHeight;
    const proportion = height * 0.02;
    if (learning) {
      const scrollLeft = learning * (23.567708 + 1.432292) * proportion;
      scrollFun(scrollLeft / 10);
    } else {
      srcollContainer.current.scrollLeft = 0;
    }
    return () => {
      timer && clearInterval(timer);
    };
  }, [learning]);
  /**
   * @description 滚动到头后取消按钮显示(只有PC端显示)
   */
  isPcClient &&
    useEffect(() => {
      srcollContainer.current.addEventListener('scroll', scroll);
      window.addEventListener('resize', scroll, false);
      return () => {
        srcollContainer.current.removeEventListener('scroll', scroll);
        window.removeEventListener('resize', scroll, false);
      };
    }, []);
  /**
   * @description 子元素数量发生变化时控制按钮显示
   */
  isPcClient &&
    useEffect(() => {
      scroll();
    }, [children && children.length]);
  /**
   * @description 性能优化
   */
  const memoCount = useMemo(() => {
    return count;
  }, [count.join('')]);
  /**
   * @description 滚动实施
   * @param {String} scrollLeft
   */
  const scrollFun = scrollLeft => {
    let index = 0;
    timer = setInterval(() => {
      if (index < 10) {
        srcollContainer.current.scrollLeft += scrollLeft;
        index++;
      } else {
        clearInterval(timer);
      }
    }, 16);
  };
  /**
   * @description 滚动时触发函数
   */
  const scroll = () => {
    // 节流
    if (throttle) return;
    throttle = true;

    const srcollElem = srcollContainer.current;
    // 如果没有滚动条都不显示
    if (srcollElem.scrollWidth === document.body.clientWidth) {
      setCount([0, 0]);
      throttle = false;
      return;
    }

    let newData;

    // 判断当前状态
    if (srcollElem.scrollLeft === 0) {
      newData = [0, 1];
    } else if (srcollElem.scrollWidth === document.body.clientWidth + srcollContainer.current.scrollLeft) {
      newData = [1, 0];
    } else {
      newData = [1, 1];
    }
    // 状态有更新 setState
    setCount(newData);
    throttle = false;
  };
  /**
   * @description 点击左右滑动按钮触发定位计算
   * @param {Number} direction 将要滑动的左右方向
   */
  const elScrollTo = direction => () => {
    // 滚动条元素
    const srcollElem = srcollContainer.current;
    // 子元素个数
    const listElemLength = ulContainer.current.children.length;
    // 第一个子元素
    const itemElem = ulContainer.current.children[0];
    // 卡片左右宽度
    const listMargin = itemElem.offsetLeft;
    // 卡片宽度
    const {width: itemElemWith} = itemElem.getBoundingClientRect();
    // 卡片间距宽度
    const itemMargin =
      (srcollElem.scrollWidth - (itemElemWith * listElemLength + listMargin * 2)) / (listElemLength - 1);
    // 获取滚动距离
    const scrollLeft = srcollElem.scrollLeft;

    // 当前位置
    const nowIndex = parseInt((scrollLeft - listMargin) / (itemElemWith + itemMargin) + 1);
    // 移动位置
    const moveIndex = parseInt(document.body.clientWidth / (itemElemWith + itemMargin)) * direction;
    // 目标位置
    let targetIndex;
    if (nowIndex + moveIndex > listElemLength) {
      targetIndex = listElemLength;
    } else if (nowIndex + moveIndex < 0) {
      targetIndex = 0;
    } else {
      targetIndex = nowIndex + moveIndex;
    }
    // 计算移动距离
    const targetLeft = targetIndex * (itemElemWith + itemMargin) - scrollLeft;
    scrollFun(targetLeft / 10);
  };
  return (
    <div ref={srcollContainer} className={classNames('rolling-container', rollingClassName)}>
      {isPcClient && (
        <>
          {!!memoCount[0] && <div className="btn-left button" onClick={elScrollTo(-1)} />}
          {!!memoCount[1] && <div className="btn-right button" onClick={elScrollTo(1)} />}
        </>
      )}
      <ul ref={ulContainer} className={listClassName}>
        {children}
      </ul>
    </div>
  );
};

export default RollingContainer;
