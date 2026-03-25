"use strict";

var BlsPasswordPopup = (function () {
  return {
    init: function () {
      this.injectStyles();
      this.showPassword();
    },
    showPassword: function () {
      const action = document.querySelector("#DialogHeading");
      const _this = this;
      if (action !== null) {
        action.style.cursor = "pointer";
        action.addEventListener("click", function (e) {
          e.preventDefault();
          _this.getContentPassword();
        });
      }
    },
    getContentPassword: function () {
      var contentEl = document.querySelector('.password-modal__content');
      var titleEl = document.querySelector('.content__password');
      if (!contentEl || !titleEl) return;

      var content = contentEl.innerHTML;
      var title = titleEl.getAttribute('data-title') || '';

      // Remove existing modal if any
      var existing = document.getElementById('bls-password-modal-overlay');
      if (existing) existing.remove();

      // Build modal
      var overlay = document.createElement('div');
      overlay.id = 'bls-password-modal-overlay';
      overlay.className = 'bls-pw-overlay';

      var modal = document.createElement('div');
      modal.className = 'bls-pw-modal';

      var header = document.createElement('div');
      header.className = 'bls-pw-header';

      var titleSpan = document.createElement('span');
      titleSpan.className = 'bls-pw-title';
      titleSpan.textContent = title;

      var closeBtn = document.createElement('button');
      closeBtn.className = 'bls-pw-close';
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.innerHTML = '&times;';

      header.appendChild(titleSpan);
      header.appendChild(closeBtn);

      var body = document.createElement('div');
      body.className = 'bls-pw-body';
      body.innerHTML = content;

      modal.appendChild(header);
      modal.appendChild(body);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      // Force reflow then add active class for animation
      overlay.offsetHeight;
      overlay.classList.add('active');

      // Close handlers
      function closeModal() {
        overlay.classList.remove('active');
        setTimeout(function () {
          overlay.remove();
        }, 200);
      }

      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
      });
      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handler);
        }
      });
    },
    injectStyles: function () {
      if (document.getElementById('bls-pw-modal-styles')) return;
      var css = document.createElement('style');
      css.id = 'bls-pw-modal-styles';
      css.textContent = [
        '.bls-pw-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.45);z-index:9999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s ease}',
        '.bls-pw-overlay.active{opacity:1}',
        '.bls-pw-modal{background:#fff;border-radius:6px;width:90%;max-width:460px;box-shadow:0 8px 30px rgba(0,0,0,.15);transform:translateY(20px);transition:transform .2s ease;overflow:hidden}',
        '.bls-pw-overlay.active .bls-pw-modal{transform:translateY(0)}',
        '.bls-pw-header{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid #e5e5e5}',
        '.bls-pw-title{font-size:16px;font-weight:600;color:#111}',
        '.bls-pw-close{background:none;border:none;font-size:26px;line-height:1;cursor:pointer;color:#666;padding:0 0 0 12px;transition:color .15s}',
        '.bls-pw-close:hover{color:#111}',
        '.bls-pw-body{padding:24px}',
        '.bls-pw-body .password-field{display:flex;gap:10px;flex-wrap:wrap}',
        '.bls-pw-body .password-input{flex:1;min-width:180px;padding:10px 14px;border:1px solid #ccc;border-radius:4px;font-size:14px;outline:none;transition:border-color .15s}',
        '.bls-pw-body .password-input:focus{border-color:#111}',
        '.bls-pw-body .password-button{padding:10px 22px;background:#111;color:#fff;border:none;border-radius:4px;font-size:14px;cursor:pointer;transition:background .15s;white-space:nowrap}',
        '.bls-pw-body .password-button:hover{background:#333}',
        '.bls-pw-body .password-error{color:#e53e3e;margin-top:12px;font-size:13px}'
      ].join('\n');
      document.head.appendChild(css);
    }
  };
})();
BlsPasswordPopup.init();