import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './style.less';

class TeachAidsDisplay extends React.Component {
  static propTypes = {
    // 点击遮罩层回调
    closeTeachAids: PropTypes.func,
    // 左右切换方法 value: 1 | -1
    choseTeachAids: PropTypes.func,
    // 是否显示教具信息
    showTeachAids: PropTypes.bool,
    // 教具数据
    teachAids: PropTypes.array,
    // 当前第几个
    num: PropTypes.number
  };
  choseList = index => () => {
    const {choseTeachAids, teachAids, num} = this.props;
    const newIndex = num + index;
    if (newIndex < 0 || newIndex > teachAids.length - 1) return;
    choseTeachAids(newIndex);
  };
  render() {
    const {showTeachAids, closeTeachAids, teachAids, num} = this.props;
    if (!showTeachAids) return null;
    const {imgUrl, name} = teachAids[num];
    return ReactDOM.createPortal(
      <div className="teach-aids">
        <div className="teach-aids-mask" onClick={closeTeachAids} />
        <div className="teach-aids-dialog">
          <div className="teach-aids-dialog-image">
            <img alt="教具" src={imgUrl} />
            <div className="teach-aids-arrow">
              {num > 0 && <div className="arrow-left" onClick={this.choseList(-1)} />}
              {teachAids.length - 1 > num && <div className="arrow-right" onClick={this.choseList(1)} />}
            </div>
          </div>
          <p className="teach-aids-dialog-text">{name}</p>
        </div>
      </div>,
      document.getElementById('root')
    );
  }
}

export default TeachAidsDisplay;
