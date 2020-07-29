//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    subjecttitle:'题目内容(单选题)',
    subjectcon: '这是题目的内容这是题目的内容，9张图片',
    analysistitle:'题目解析(选填)',
    analysiscon:'这是题目的解析这是题目的解析,9张图片',
    imgs:[],
    imgs2:[],
    boxItem: [
      {name:'A', value:'输入这个选项，一张图片'},
      {name:'B', value:'这是内容'},
      {name:'C', value:'输入这个选项，有很多字可以回行输入有很多字可以回行输入'},
      {name:'D', value:'内容'}
    ],
    clickId: -1
  },
  // 采用排他思想
  selectBtn(event) {    
    this.setData({      
       clickId: event.currentTarget.id,   
    })  
 },
  onLoad: function () {
  },
  // 上传图片
 chooseImg: function (e) {
   console.log(e)
  var that = this;
  var imgs = this.data.imgs;
  if (imgs.length >= 9) {
   this.setData({
    lenMore: 1
   });
   setTimeout(function () {
    that.setData({
     lenMore: 0
    });
   }, 2500);
   return false;
  }
  wx.chooseImage({
   // count: 1, // 默认9
   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
   success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    var tempFilePaths = res.tempFilePaths;
    var imgs = that.data.imgs;
    // console.log(tempFilePaths + '----');
    for (var i = 0; i < tempFilePaths.length; i++) {
     if (imgs.length >= 9) {
      that.setData({
       imgs: imgs
      });
      return false;
     } else {
      imgs.push(tempFilePaths[i]);
     }
    }
    // console.log(imgs);
    that.setData({
     imgs: imgs
    });
   }
  });
 },
 chooseImg2: function (e) {
  console.log(e)
 var that = this;
 var imgs = this.data.imgs2;
 if (imgs.length >= 9) {
  this.setData({
   lenMore: 1
  });
  setTimeout(function () {
   that.setData({
    lenMore: 0
   });
  }, 2500);
  return false;
 }
 wx.chooseImage({
  // count: 1, // 默认9
  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  success: function (res) {
   // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
   var tempFilePaths = res.tempFilePaths;
   var imgs = that.data.imgs2;
   // console.log(tempFilePaths + '----');
   for (var i = 0; i < tempFilePaths.length; i++) {
    if (imgs.length >= 9) {
     that.setData({
      imgs2: imgs
     });
     return false;
    } else {
     imgs.push(tempFilePaths[i]);
    }
   }
   // console.log(imgs);
   that.setData({
    imgs2: imgs
   });
  }
 });
},
 // 删除图片
 deleteImg: function (e) {
  let imgs = this.data.imgs;
  let index = e.currentTarget.dataset.index;
  imgs.splice(index, 1);
  this.setData({
   imgs: imgs
  });
 },
 deleteImg2: function (e) {
  let imgs = this.data.imgs2;
  let index = e.currentTarget.dataset.index;
  imgs.splice(index, 1);
  this.setData({
   imgs2: imgs
  });
 },
 // 预览图片
 previewImg: function (e) {
   //获取当previewImg前图片的下标
  let index = e.currentTarget.dataset.index;
   //所有图片
  let imgs = this.data.imgs;
  wx.previewImage({
   //当前显示图片
   current: imgs[index],
   //所有图片
   urls: imgs
  })
 },
 previewImg2: function (e) {
  //获取当previewImg前图片的下标
 let index = e.currentTarget.dataset.index;
  //所有图片
 let imgs = this.data.imgs2;
 wx.previewImage({
  //当前显示图片
  current: imgs[index],
  //所有图片
  urls: imgs
 })
},
//  添加选项
addItem: function(e) {
  let boxItem = this.data.boxItem
  let index = boxItem[boxItem.length-1].name.charCodeAt()-64 + 1
  let alphabet= String.fromCharCode(64 + index)
  // console.log(alphabet)
  boxItem.push({
    name:alphabet,
    value:'输入内容'
  })
  // console.log(boxItem)
  this.setData({
    boxItem:boxItem
  })
}
})
