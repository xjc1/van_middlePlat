import React, { Component } from 'react';

import styles from './style.less';

function getRandomColor() {
  const colors = [
    '#3f6600',
    '#a0d911',
    '#876800',
    '#d4380d',
    '#613400',
    '#cf1322',
    '#237804',
    '#ad6800',
    '#006d75',
    '#c41d7f',
    '#003a8c',
    '#391085',
    '#061178',
    '#391085',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default class Captcha extends Component {
  canvas = React.createRef();

  static defaultProps = {
    width: 60,
    height: 32,
    fontSize: 14,
  };

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.draw();
    }
  }

  draw() {
    const { text, width, height, fontSize } = this.props;
    if (text) {
      const ctx = this.canvas.current.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.font = '19px serif';
      const letters = text.split('');
      const averageWidth = (width - fontSize) / letters.length;
      letters.forEach((letter, index) => {
        const x = averageWidth * index + fontSize / 2;
        const y = (height + fontSize) / 2;
        const radian =
          Math.random() < 0.5
            ? (-Math.PI / 180) * Math.random() * 15
            : (Math.PI / 180) * Math.random() * 15;
        ctx.translate(x, 0);
        ctx.rotate(radian);
        ctx.fillStyle = getRandomColor();
        ctx.fillText(letter, 0, y);
        ctx.rotate(-radian);
        ctx.translate(-x, 0);
      });
    }
  }

  render() {
    const { width, height, onClick, onChange } = this.props;
    return (
      <canvas
        style={{
          display: 'block',
          margin: 'auto',
          float: 'right',
        }}
        className={styles.cm_captcha}
        ref={this.canvas}
        width={'100%'}
        height={height}
        onClick={onClick}
      />
    );
  }
}

function randomWord(randomFlag, min, max) {
  let str = '';
  let range = min;
  const arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

export { randomWord };
