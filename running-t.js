exports.header = null

 exports.footer = {
  contents: function(pageNum, numPages) {
    return "<p style='text-align: center; font-size: 12px;'>" + pageNum + " of " + numPages + "</p>"
  },
  height: '1cm'
}