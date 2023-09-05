// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  properties: {
    prize: {
      type: Object
    },
    chance: {
      type: Number
    }
  },
  data: {
    onRotation: false,
    reward: 0,
    stoppingName:'',
    prize: [
      {
      'name': '霸王别姬',
      'winnning': 0.2,
      'count': 17
    },
    {
      'name': '茶百道',
      'winnning': 0.5,
      'count': 17
    }, {
      'name': '一点点',
      'winnning': 0.05,
      'count': 16
    }, {
      'name': '奈雪的茶',
      'winnning': 0.05,
      'count': 15
    }, 
    {
      'name': '蜜雪冰城',
      'winnning': 0.1,
      'count': 14
    }, 
    {
      'name': '茶颜悦色',
      'winnning': 0.1,
      'count': 13
    },{
      'name': '喜茶',
      'winnning': 0.2,
      'count': 12
    },
    {
      'name': 'COCo',
      'winnning': 0.5,
      'count': 11
    }, {
      'name': '古茗',
      'winnning': 0.05,
      'count': 10
    }, {
      'name': '泸上阿姨',
      'winnning': 0.05,
      'count': 9
    }, 
    {
      'name': '快乐柠檬',
      'winnning': 0.1,
      'count': 8
    }, 
    {
      'name': '书亦烧仙草',
      'winnning': 0.1,
      'count': 7
    },{
      'name': '桃园三章',
      'winnning': 0.2,
      'count': 6
    },
    {
      'name': '山住茶',
      'winnning': 0.5,
      'count': 5
    }, {
      'name': '九州树叶',
      'winnning': 0.05,
      'count': 4
    }, {
      'name': '7分甜',
      'winnning': 0.05,
      'count': 3
    }, 
    {
      'name': '冰雪时光',
      'winnning': 0.1,
      'count': 2
    }, 
    {
      'name': 'LELECHA',
      'winnning': 0.1,
      'count': 1
    }
  ],
  },
    getRange(winning) {
      let temp = []
      winning.forEach((item, index) => {
        if (index === 0) {
          temp.push(item['winnning'] * 360)
        } else {
          temp.push(parseInt(temp.slice(-1)) + item['winnning'] * 360)
        }
      })
      return temp
    },
    getReward() {
      // 求出中奖范围
      let winningRange = this.getRange(this.data.prize)
      // 抽到的随记数
      let random = Math.round(Math.random() * 360)
      // 判断是否中奖
      for (let i in winningRange) {
        let currentwinning = winningRange[i] // 当前取值
        if (random < currentwinning) {
          this.setData({
            reward: i
          })
          break
        } else {
          if (i == 0) {
            continue
          }
          if (random >= winningRange[i - 1] && random <= currentwinning) {
            this.setData({
              reward: i
            })
            break
          }
        }
      }
    },
    onPoint(e) {
      // 平均值
      const averageRotate = 360 / this.data.prize.length
      // 是否有抽奖机会
      // if (this.properties.chance === 0) {
      //   this.triggerEvent('none')
      //   return
      // }
      // 防止转动时点击开始按钮
      if (!this.data.onRotation) {
        this.setData({
          onRotation: true
        })
        this.getReward()
        let deg = this.data.reward * averageRotate + 3 * 360  // 至少3圈以上
        this.animate('.wrapper', [{
            rotate: 0,
            ease: 'ease-in-out'
          },
          {
            rotate: deg,
            ease: 'ease-in-out'
          }
        ], 5000 + Math.random()*1000, function () {
          this.setData({
            onRotation: false
          })
          this.setData({
            stoppingName:this.data.prize[this.data.reward].name
          })
          // 发送自己的抽奖信息
          // this.triggerEvent('onResult', this.properties.prize[this.data.reward])
        }.bind(this))
      }
    },
    // 让动画重置
    onClear(){
      this.clearAnimation('.wrapper')
    }
})