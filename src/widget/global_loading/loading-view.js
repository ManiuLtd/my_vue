module.exports = data => `
<div class="window_bg"></div>
<div class="loading_bg" v-if="show_global_loading">
  <img class="loading_icon" src="../../../static/images/loading.gif"/>
  <span class="loading_content">${data.content}</span>
</div>
`;
