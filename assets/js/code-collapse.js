$(document).ready(function () {
  // 判断是手机端还是pc端,增加class
  if (/Android|webOS|iPhone|iPod|BlackBerry|HXApp/i.test(navigator.userAgent)) {
    $("body").addClass("mobile");
    var meta = document.querySelector('meta[name="viewport"]');
    // meta &&
    //   meta.setAttribute("content", "width=device-width, initial-scale=0.9");
  }

  // 判断标签text是toggle,就折叠代码(hightlight的title参数当成折叠参数用)
  //   遍历
  $(".highlight").each(function () {
    const target = $(this).find("figcaption span");
    if (target && target.text() === "[toggle]") {
      target.hide();
      target.parents(".highlight").find("table").hide();
      target
        .parents(".highlight")
        .find(".highlight-tools")
        .prepend(
          '<i class="fa fa-chevron-down icon-toggle" style="cursor:pointer;margin-right:45px;"></i>'
        );
      // 插入查看更多文字
      target
        .parents(".highlight")
        .prepend(
          '<span class="more-text" style="color:#fff;position:absolute;cursor:pointer;left:50%;transform:translateX(-50%);color: #98c379;text-decoration: underline;">more</span>'
        );
    } else {
      // 如果高度<=54, 就不显示折叠按钮
      if ($(this).height() <= 54) {
        return;
      }
      // 往前插入折叠按钮
      $(this)
        .find(".highlight-tools")
        .prepend(
          '<i class="fa fa-chevron-up icon-toggle" style="cursor:pointer;margin-right:45px;"></i>'
        );
    }
  });

  //   折叠代码块
  $(".icon-toggle").click(function () {
    $(this).parents(".highlight").find("table").slideToggle();
    const more = $(this).parents(".highlight").find(".more-text");
    // 图标反转
    if ($(this).hasClass("fa-chevron-up")) {
      // 收起
      $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
      //  显示查看更多文字
      more.show();
    } else {
      // 展开
      $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
      //   隐藏查看更多文字
      more.hide();
    }
  });
  $(".more-text").click(function () {
    $(this).parents(".highlight").find(".icon-toggle").click();
  });
});
