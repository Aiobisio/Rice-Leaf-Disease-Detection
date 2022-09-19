Page({
  data: {
    avatarUrl: 'res.png',
    base64imgurl: null,
    name_num: '',
    names: [],
    name_and_nums: ''
  },
  chooseimg: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({avatarUrl:tempFilePaths[0]})
        console.log(tempFilePaths[0])
        wx.setStorage({key:'key', data: tempFilePaths[0]})
      }
    })
  },
  submitimg: function() {
    var that = this
    wx.getStorage({
      key: 'key',
      success (res) {
        var img_path = res.data
        console.log(img_path)
        wx.getImageInfo({
          src: img_path,
          success(res) {
            var imgtype = res.type
            console.log(imgtype)
            wx.uploadFile({
              filePath: img_path,
              name: 'image',
              url: 'http://192.168.237.135:8080/',
              success(res) {
                console.log(res)
                var img_data =  JSON.parse(res.data).data.image
                var base64str_img = 'data:image/' + imgtype + ';base64,' + img_data
                that.setData({avatarUrl: base64str_img})
              }
            })
          }
        })
      }
    })  
  } 
})
