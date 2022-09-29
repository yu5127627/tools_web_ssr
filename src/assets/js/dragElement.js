import { emitter } from "./mitt";

class DragElement {
    constructor(ele) {
        this.ele = document.querySelector(ele);
        this.parentEle = this.ele.parentElement;
        this.isMove = false;
        this.startDis = [];
        this.disTop = 0;
        this.disLeft = 0;
        this.initConfig();
        this.eventFn();
    }

    // 初始化
    initConfig() {
        this.parentEle.style.position = 'relative';
        this.ele.style.position = 'absolute';
    }

    eventFn() {
        this.ele.addEventListener('mousedown', (e) => {
          const event = e || window.event;
            this.startDis = [event.clientX, event.clientY];
            this.disTop = this.ele.offsetTop;
            this.disLeft = this.ele.offsetLeft;
          this.ele.style.cursor = 'move';
           this.isMove = true;
          this.ele.addEventListener('mousemove', this.handleMove);
        })

      this.ele.addEventListener('mouseup', (e) => {
            this.isMove = false;
            this.ele.removeEventListener('mousemove', this.handleMove);
        })

      this.ele.addEventListener('mouseleave', (e) => {
          if (!this.isMove) return
          const event = e || window.event;
          const diffX = event.clientX - this.startDis[0];
          // const diffY = event.clientY - this.startDis[1];
          // this.ele.style.top = this.disTop + diffY + 'px';
          const offsetX = this.disLeft + diffX;
          if (offsetX > 470||offsetX < 10) return
          this.ele.style.left = this.disLeft + diffX + 'px';
          emitter.emit('move-left', { left: offsetX-10   });
          this.isMove = false;
          this.ele.removeEventListener('mousemove', this.handleMove);
      })
    }

  handleMove = (e) => {
    if (!this.isMove) return
    const event = e || window.event;
    const diffX = event.clientX - this.startDis[0];
    // const diffY = event.clientY - this.startDis[1];
    // this.ele.style.top = this.disTop + diffY + 'px';
    const offsetX = this.disLeft + diffX;
    if (offsetX > 470||offsetX < 10) return
    this.ele.style.left = offsetX + 'px';
    emitter.emit('move-left', { left: offsetX-10   });
  }
}

export default DragElement