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
        'name': '爆炒鱿鱼须',
        'winnning': 0.2,
        'count': 40
      },{
        'name': '麻婆豆腐',
        'winnning': 0.2,
        'count': 39
      },{
      'name': '耗油生菜',
      'winnning': 0.2,
      'count': 38
    },
    {
      'name': '白切鸡',
      'winnning': 0.5,
      'count': 37
    }, {
        'name': '柠檬鸡脚',
        'winnning': 0.2,
        'count': 36
      },{
        'name': '荷兰豆炒肉',
        'winnning': 0.2,
        'count': 35
      },{
        'name': '凉拌黄瓜',
        'winnning': 0.2,
        'count': 34
      },{
      'name': '白灼虾',
      'winnning': 0.2,
      'count': 33
    },
    {
      'name': '酸辣鸡胗',
      'winnning': 0.5,
      'count': 32
    }, {
        'name': '炒西兰花',
        'winnning': 0.2,
        'count': 31
      },{
        'name': '炒红薯叶',
        'winnning': 0.2,
        'count': 30
      },{
        'name': '冬瓜炒肉',
        'winnning': 0.2,
        'count': 29
      },{
      'name': '炒南瓜',
      'winnning': 0.2,
      'count': 28
    },
    {
      'name': '佛手瓜炒肉',
      'winnning': 0.5,
      'count': 27
    }, {
        'name': '羊肉炖萝卜',
        'winnning': 0.2,
        'count': 26
      },{
        'name': '辣子鸡块',
        'winnning': 0.2,
        'count': 25
      },{
        'name': '鱼汤',
        'winnning': 0.2,
        'count': 24
      },{
      'name': '爆炒花甲',
      'winnning': 0.2,
      'count': 23
    },
    {
      'name': '土豆炒肉',
      'winnning': 0.5,
      'count': 22
    }, {
        'name': '排骨汤',
        'winnning': 0.2,
        'count': 21
      },{
        'name': '炒鸡脚',
        'winnning': 0.2,
        'count': 20
      },{
        'name': '啤酒鸭',
        'winnning': 0.2,
        'count': 19
      },{
      'name': '可乐鸡翅',
      'winnning': 0.2,
      'count': 18
    },
    {
      'name': '清蒸鲈鱼',
      'winnning': 0.5,
      'count': 17
    }, {
      'name': '手撕包菜',
      'winnning': 0.05,
      'count': 16
    }, {
      'name': '五花肉炒豌豆',
      'winnning': 0.05,
      'count': 15
    }, 
    {
      'name': '空心菜',
      'winnning': 0.1,
      'count': 14
    }, 
    {
      'name': '丝瓜汤',
      'winnning': 0.1,
      'count': 13
    },{
      'name': '炒藕片',
      'winnning': 0.2,
      'count': 12
    },
    {
      'name': '番茄炒蛋',
      'winnning': 0.5,
      'count': 11
    }, {
      'name': '胡萝卜炒牛肉',
      'winnning': 0.05,
      'count': 10
    }, {
      'name': '红烧大虾',
      'winnning': 0.05,
      'count': 9
    }, 
    {
      'name': '红烧土豆',
      'winnning': 0.1,
      'count': 8
    }, 
    {
      'name': '辣椒炒肉',
      'winnning': 0.1,
      'count': 7
    },{
      'name': '韭菜鸡蛋',
      'winnning': 0.2,
      'count': 6
    },
    {
      'name': '炒青菜',
      'winnning': 0.5,
      'count': 5
    }, {
      'name': '红烧鸡翅根',
      'winnning': 0.05,
      'count': 4
    }, {
      'name': '辣椒炒鸡蛋',
      'winnning': 0.05,
      'count': 3
    }, 
    {
      'name': '鸡汤',
      'winnning': 0.1,
      'count': 2
    }, 
    {
      'name': '炒排骨',
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
        ], 5000  + Math.random()*1000, function () {
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