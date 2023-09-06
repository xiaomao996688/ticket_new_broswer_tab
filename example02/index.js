class Game {
  static instance = null;
  robot = null;
  man = null;
  title = null;
  play = null;
  mask = null;
  select = null;
  button = null;
  box = null;
  data = {
    total: 0,
    robot: {
      win: 0,
      fail: 0,
    },
    man: {
      win: 0,
      fail: 0,
    },
  };
  constructor() {
    if (Game.instance) {
      return Game.instance;
    }
    this.init();
    return (Game.instance = this);
  }
  init() {
    if (!this.robot) {
      this.robot = this.getRobot();
    }
    if (!this.man) {
      this.man = this.getMan();
    }
    if (!this.title) {
      this.title = this.getTitle();
    }
    if (!this.play) {
      this.play = this.getPlay();
      this.handlePlay();
    }
    // this.random();
  }
  getRobot() {
    const img = document.querySelector(".left .game #game-icon");
    const text = document.querySelector(".left .game span");
    const win = document.querySelector(".left .win");
    const fail = document.querySelector(".left  .fail");
    return {
      text,
      img,
      win,
      fail,
    };
  }
  getTitle() {
    return document.querySelector(".title");
  }
  getMan() {
    const img = document.querySelector(".right .game #game-icon");
    const text = document.querySelector(".right .game span");
    const win = document.querySelector(".right  .win");
    const fail = document.querySelector(".right  .fail");

    return {
      text,
      img,
      win,
      fail,
    };
  }
  getPlay() {
    return document.querySelector(".play");
  }
  handlePlay() {
    this.getPlay().addEventListener("click", () => {
      this.getMask();
      document.body.appendChild(this.mask);
      this.initPlay();
    });
  }
  getMask() {
    const mask = (this.mask = document.createDocumentFragment());
    const data = ["", "剪刀", "石头", "布"];
    const warp = document.createElement("div");
    const box = (this.box = document.createElement("div"));
    const select = (this.select = document.createElement("select"));
    data.forEach((d, i) => {
      const option = document.createElement("option");
      option.setAttribute("value", i);
      option.innerText = d;
      select.appendChild(option);
    });
    const selectWrap = document.createElement("div");
    const text = document.createElement("span");
    const button = (this.button = document.createElement("button"));
    text.innerText = "请选择要出的手势： ";
    button.innerHTML = "确定";
    selectWrap.appendChild(text);
    selectWrap.appendChild(select);
    box.appendChild(selectWrap);
    box.appendChild(button);
    warp.appendChild(box);
    button.classList.add("confirm");
    box.classList.add("box");
    warp.classList.add("mask");
    mask.appendChild(warp);
  }
  initPlay() {
    const mask = document.querySelector(".mask");
    this.select.addEventListener("change", (e) => {
      const value = this.random();
      console.log(value, e.target.value);
      if (value == "0" || e.target.value == "0") {
        return;
      }
      document.body.removeChild(mask);
      if (this.data.total >= 3) {
        return;
      }
      this.showText(value, Number(e.target.value));

      console.log(value, Number(e.target.value));
      this.operator(this.robot, value);
      this.operator(this.man, Number(e.target.value));
    });
    this.button.addEventListener("click", (e) => {
      document.body.removeChild(mask);
    });
  }
  operator(target, value) {
    console.log(value, "value");
    console.log(target, "target", value);
    switch (value) {
      case 1:
        target.img.src = "./assets/scissor.png";
        break;
      case 2:
        target.img.src = "./assets/rock.png";
        break;
      case 3:
        target.img.src = "./assets/paper.png";
        break;
      default:
        break;
    }
    target.text.style.display = "none";
  }
  random() {
    const random = Math.floor(((Math.random() * (4 - 1) + 1) * 10) / 10);
    return random;
  }
  showText(robot, man) {
    this.data.total += 1;

    if (robot === 1) {
      if (man === 2) {
        this.data.man.win += 1;
        this.data.robot.fail += 1;
      }
      if (man === 3) {
        this.data.robot.win += 1;
        this.data.man.fail += 1;
      }
    }

    if (robot === 2) {
      if (man === 1) {
        this.data.robot.win += 1;
        this.data.man.fail += 1;
      }
      if (man === 3) {
        this.data.man.win += 1;
        this.data.robot.fail += 1;
      }
    }

    if (robot === 3) {
      if (man === 1) {
        this.data.man.win += 1;
        this.data.robot.fail += 1;
      }
      if (man === 2) {
        this.data.robot.win += 1;
        this.data.man.fail += 1;
      }
    }
    console.log(this.data, "ddd");
    if (this.data.total === 3) {
      console.log("鼠鼠祟祟");
      if (this.data.robot.win === this.data.man.win) {
        this.title.innerText = `平局呀`;
      } else if (this.data.robot.win > this.data.man.win) {
        this.title.innerText = `机器人胜利`;
      } else {
        this.title.innerText = `你真棒！赢了啊`;
      }
      return;
    }
    this.robot.win.innerText = this.data.robot.win;
    this.robot.fail.innerText = this.data.robot.fail;
    this.man.win.innerText = this.data.man.win;
    this.man.fail.innerText = this.data.man.fail;
    this.title.innerText = `第${this.data.total}回合（共三回合）`;
  }
}
// 弹窗

const game = new Game();
console.log(game, "game");
