(function ($) {
  // Caption
  $('.article-entry').each(function (i) {
    $(this).find('img').each(function () {
      if ($(this).parent().hasClass('fancybox')) return

      var alt = this.alt

      if (alt) {
        $(this).after('<span class="caption">' + alt + '</span>')
      }

      $(this).wrap('<a href="' + this.src + '" data-fancybox=\"gallery\" data-caption="' + alt + '"></a>')
    })

    $(this).find('.fancybox').each(function () {
      $(this).attr('rel', 'article' + i)
    })
  })

  if ($.fancybox) {
    $('.fancybox').fancybox()
  }


  $(document).ready(function() {
	  var QRBox	=	$('#QRBox');
	  var MainBox	=	$('.MainBox');
	  var BTCQR	=	$('#BTCQR');
	  var AliPayQR	=	$('#AliPayQR');
	  var WeChatQR	=	$('#WeChatQR');
    var currentQR;

	  function showQR(QR) {
		  $('#DonateText,#donateBox,#github').addClass('blur');
      currentQR = QR;
		  QRBox.fadeIn(300,function(argument) {
			  QR.addClass('showQR');
		  });
	  }

	  $('#donateBox>li').click(function(event) {
		  var thisID	=	$(this).attr('id');
		  if (thisID === 'BTC') {
			  showQR(BTCQR);
			  new ClipboardJS('#BTCBn');
		  } else if (thisID === 'AliPay') {
			  showQR(AliPayQR);
		  } else if (thisID === 'WeChat') {
			  showQR(WeChatQR);
		  }
	  });

	  MainBox.click(function(event) {
		  if (currentQR) currentQR.removeClass('showQR').addClass('hideQR');
		  setTimeout (function(a) {
			  QRBox.fadeOut(300,function(argument) {
				  MainBox.removeClass('hideQR');
			  });
			  $('#DonateText,#donateBox,#github').removeClass('blur');
		  },600);
		});

		// Hide mobile menu when click outside of the menu
		$(document).click(function(event) {
			const mainNavDisplay = $('.main-nav').css('display');
			const mobileNav = $('.mobile-nav-link');
			const menuBtn = $('#menu-button');
			const mobileToggle = $('#mobile-menu-toggle');
			const isClickedOutside = !$(event.target).is(mobileNav);

			if (mainNavDisplay !== 'none' || $(event.target).is(menuBtn) || $(event.target).is(mobileToggle) || mobileToggle.prop('checked') === false) return;

			if (isClickedOutside) {
				mobileToggle.prop('checked', false);
			}
		});

		// 主题切换功能 - 已暂时禁用
		/*
		const themeToggle = $('#theme-toggle');
		const themeIconSun = $('.theme-icon-sun');
		const themeIconMoon = $('.theme-icon-moon');
		const body = $('body');

		// 获取当前主题状态
		function getCurrentTheme() {
			const savedTheme = localStorage.getItem('theme');
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

			if (savedTheme) {
				return savedTheme === 'dark';
			} else {
				return prefersDark; // 如果没有保存的偏好，使用系统偏好
			}
		}

		// 应用主题到DOM
		function applyThemeToDOM(isDark) {
			// 立即应用到documentElement和body
			if (isDark) {
				document.documentElement.classList.add('dark');
				document.body.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
				document.body.classList.remove('dark');
			}
		}

		// 设置按钮和图标状态
		function setButtonState(isDark) {
			if (!themeToggle.length) return;

			// 先隐藏所有图标
			themeIconSun.css({
				'opacity': '0',
				'transform': 'scale(0.3) rotate(180deg)',
				'position': 'absolute',
				'pointer-events': 'none'
			});
			themeIconMoon.css({
				'opacity': '0',
				'transform': 'scale(0.3) rotate(-180deg)',
				'position': 'absolute',
				'pointer-events': 'none'
			});

			// 延迟显示正确的图标
			setTimeout(() => {
				if (isDark) {
					themeToggle.addClass('dark-theme-active');
					themeIconMoon.css({
						'opacity': '1',
						'transform': 'scale(1) rotate(0deg)',
						'position': 'static',
						'pointer-events': 'auto'
					});
				} else {
					themeToggle.removeClass('dark-theme-active');
					themeIconSun.css({
						'opacity': '1',
						'transform': 'scale(1) rotate(0deg)',
						'position': 'static',
						'pointer-events': 'auto'
					});
				}
			}, 50);
		}

		// 初始化主题
		function initTheme() {
			const isDark = getCurrentTheme();

			// 立即应用主题到DOM，防止闪烁
			applyThemeToDOM(isDark);

			// 设置按钮状态
			setButtonState(isDark);
		}

		// 平滑切换主题
		function switchTheme(toDark) {
			if (!themeToggle.length) return;

			// 防止重复点击
			if (themeToggle.hasClass('switching')) return;
			themeToggle.addClass('switching');

			// 隐藏当前图标
			if (toDark) {
				themeIconSun.css({ 'opacity': '0', 'transform': 'scale(0.3) rotate(180deg)' });
			} else {
				themeIconMoon.css({ 'opacity': '0', 'transform': 'scale(0.3) rotate(-180deg)' });
			}

			// 切换主题
			setTimeout(() => {
				applyThemeToDOM(toDark);

				// 显示新图标
				if (toDark) {
					themeToggle.addClass('dark-theme-active');
					themeIconMoon.css({ 'opacity': '1', 'transform': 'scale(1) rotate(0deg)' });
				} else {
					themeToggle.removeClass('dark-theme-active');
					themeIconSun.css({ 'opacity': '1', 'transform': 'scale(1) rotate(0deg)' });
				}
			}, 200);

			// 保存用户选择并移除切换状态
			setTimeout(() => {
				localStorage.setItem('theme', toDark ? 'dark' : 'light');
				themeToggle.removeClass('switching');
			}, 400);
		}

		// 页面加载时立即应用主题（防止闪烁）
		(function() {
			const isDark = getCurrentTheme();
			applyThemeToDOM(isDark);
		})();

		// DOM准备完成后初始化
		$(document).ready(function() {
			initTheme();

			// 监听系统主题变化（仅当用户没有手动设置时）
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
				if (!localStorage.getItem('theme')) {
					switchTheme(e.matches);
				}
			});

			// 主题切换按钮点击事件
			themeToggle.click(function() {
				const currentIsDark = body.hasClass('dark');
				switchTheme(!currentIsDark);
			});
		});
		*/
  });
})(jQuery)
