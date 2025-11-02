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

		// macOS风格的代码块三个点
		function addMacStyleDots() {
			$('.highlight').each(function() {
				const $this = $(this);
				const $figure = $this.closest('figure');

				// 避免重复添加
				if ($figure.find('.mac-dots').length > 0) {
					return;
				}

				// 创建macOS风格的三个点
				const $macDots = $('<div class="mac-dots">' +
					'<span class="dot dot-red"></span>' +
					'<span class="dot dot-yellow"></span>' +
					'<span class="dot dot-green"></span>' +
					'</div>');

				// 添加到代码块容器
				$figure.prepend($macDots);
			});
		}

		// 初始化macOS风格的点
		addMacStyleDots();

		// 为动态加载的内容也添加macOS风格的点
		const macDotsObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.addedNodes.length) {
					addMacStyleDots();
				}
			});
		});

		macDotsObserver.observe(document.body, {
			childList: true,
			subtree: true
		});

		// 代码块复制功能
		function addCopyButtons() {
			// 处理 figure.highlight 代码块
			$('figure.highlight').each(function() {
				const $figure = $(this);

				// 避免重复添加
				if ($figure.find('.copy-button').length > 0) {
					return;
				}

				// 创建复制按钮
				const $copyBtn = $('<button class="copy-button" title="复制代码" aria-label="复制代码">' +
					'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
					'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>' +
					'<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
					'</svg>' +
					'</button>');

				// 添加到代码块容器
				$figure.append($copyBtn);

				// 复制功能
				$copyBtn.click(function(e) {
					e.preventDefault();
					e.stopPropagation();

					// 精确获取代码文本，彻底排除行号
					let codeText = '';

					// 方法1: 直接从code标签获取（最准确）
					if ($figure.find('pre > code').length > 0) {
						codeText = $figure.find('pre > code').text();
					}
					// 方法2: 从.code容器获取
					else if ($figure.find('.code pre code').length > 0) {
						codeText = $figure.find('.code pre code').text();
					}
					// 方法3: 从code标签获取（通用）
					else if ($figure.find('code').length > 0) {
						codeText = $figure.find('code').text();
					}
					// 方法4: 直接从整个figure获取，但排除gutter
					else {
						// 克隆整个figure元素
						const $figureClone = $figure.clone();
						// 移除gutter（行号列）
						$figureClone.find('.gutter, .line-numbers').remove();
						// 获取剩余的文本
						codeText = $figureClone.text();
					}

					// 清理文本：移除多余的空白和换行
					codeText = codeText
						.replace(/^\s+|\s+$/g, '') // 移除首尾空白
						.replace(/\n\s*\n/g, '\n') // 移除多余的空行
						.replace(/^\d+$/gm, ''); // 移除单独一行的数字（如果有遗漏的行号）

					// 清理文本
					codeText = codeText.trim();

					console.log('复制代码:', codeText.substring(0, 50) + '...');

					// 使用现代浏览器的复制API
					if (navigator.clipboard && window.isSecureContext) {
						navigator.clipboard.writeText(codeText).then(function() {
							showCopySuccess($copyBtn);
						}).catch(function(err) {
							console.error('Clipboard API失败:', err);
							// 降级方案
							fallbackCopyTextToClipboard(codeText, $copyBtn);
						});
					} else {
						// 降级方案
						fallbackCopyTextToClipboard(codeText, $copyBtn);
					}
				});
			});

			// 处理 pre 代码块（非 figure 包装的）
			$('.article-entry pre').each(function() {
				const $pre = $(this);

				// 跳过已经被 figure.highlight 处理的
				if ($pre.closest('figure.highlight').length > 0) {
					return;
				}

				// 避免重复添加
				if ($pre.find('.copy-button').length > 0) {
					return;
				}

				// 创建复制按钮
				const $copyBtn = $('<button class="copy-button" title="复制代码" aria-label="复制代码">' +
					'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
					'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>' +
					'<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
					'</svg>' +
					'</button>');

				// 添加到代码块容器
				$pre.append($copyBtn);

				// 复制功能
				$copyBtn.click(function(e) {
					e.preventDefault();
					e.stopPropagation();

					let codeText = '';

					// 直接从code标签获取
					if ($pre.find('> code').length > 0) {
						codeText = $pre.find('> code').text();
					} else if ($pre.find('code').length > 0) {
						codeText = $pre.find('code').text();
					} else {
						codeText = $pre.text();
					}

					// 清理文本：移除多余的空白和换行
					codeText = codeText
						.replace(/^\s+|\s+$/g, '') // 移除首尾空白
						.replace(/\n\s*\n/g, '\n') // 移除多余的空行
						.replace(/^\d+$/gm, ''); // 移除单独一行的数字（如果有遗漏的行号）

					// 清理文本
					codeText = codeText.trim();

					console.log('复制代码 (pre):', codeText.substring(0, 50) + '...');

					// 使用现代浏览器的复制API
					if (navigator.clipboard && window.isSecureContext) {
						navigator.clipboard.writeText(codeText).then(function() {
							showCopySuccess($copyBtn);
						}).catch(function(err) {
							console.error('Clipboard API失败:', err);
							// 降级方案
							fallbackCopyTextToClipboard(codeText, $copyBtn);
						});
					} else {
						// 降级方案
						fallbackCopyTextToClipboard(codeText, $copyBtn);
					}
				});
			});
		}

		// 降级复制方案
		function fallbackCopyTextToClipboard(text, $button) {
			const textArea = document.createElement("textarea");
			textArea.value = text;
			textArea.style.position = "fixed";
			textArea.style.left = "-999999px";
			textArea.style.top = "-999999px";
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();

			try {
				document.execCommand('copy');
				showCopySuccess($button);
			} catch (err) {
				console.error('复制失败:', err);
			}

			document.body.removeChild(textArea);
		}

		// 显示复制成功状态
		function showCopySuccess($button) {
			const originalHTML = $button.html();

			$button.addClass('copied');
			$button.html('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
				'<polyline points="20 6 9 17 4 12"></polyline>' +
				'</svg>');

			setTimeout(function() {
				$button.removeClass('copied');
				$button.html(originalHTML);
			}, 2000);
		}

		// 初始化代码块复制功能
		addCopyButtons();

		// 为动态加载的内容也添加复制功能
		const copyObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.addedNodes.length) {
					setTimeout(function() {
						addCopyButtons();
					}, 100); // 延迟一下确保macOS的点已经添加
				}
			});
		});

		copyObserver.observe(document.body, {
			childList: true,
			subtree: true
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
