# SnowySonnets å¼€å‘æ—¥å¿—

> æœ¬æ–‡æ¡£è®°å½•å½“å‰å·¥ä½œåŒºå†…çš„æ‰€æœ‰æ–‡ä»¶/ç›®å½•æ“ä½œä¸å¼€å‘è¿›åº¦ã€‚

## 2026-01-01 åˆå§‹çŠ¶æ€

- å·¥ä½œåŒºè·¯å¾„ï¼š`C:\Users\queenie\Desktop\ä½œå“ï¼\SnowySonnets`
- åˆå§‹å†…å®¹ï¼š
  - `img/`ï¼šç¾æœ¯ç´ æï¼ˆstart.pngã€background.pngã€bubble_frame.pngã€Es_left1-3.pngã€Es_sit.pngã€little_Es1-5.pngï¼‰
  - `font-zyqs06el.ttf`ï¼šç½‘ç«™å­—ä½“
  - `éœ€æ±‚æ–‡æ¡£.txt`ï¼šéœ€æ±‚æ–‡æ¡£ v0.3
- ç¯å¢ƒæ£€æŸ¥ï¼šå½“å‰æœºå™¨æœªå®‰è£… `hugo` å‘½ä»¤ã€‚

## å¼€å‘è®¡åˆ’

1. æ­å»º Hugo é¡¹ç›®éª¨æ¶
2. æ•´ç†ç´ æåˆ° static ç›®å½•
3. ç¼–å†™ä¸»é¢˜ layouts / CSS / JS
4. ç”Ÿæˆç›®å½•æ ‘ä¸æœç´¢æ•°æ®
5. é…ç½® GitHub Actions è‡ªåŠ¨éƒ¨ç½²
6. æœ¬åœ°æ„å»ºéªŒè¯ï¼ˆå¦‚åç»­å®‰è£… Hugoï¼‰

## 2026-01-01 Ä¿Â¼ÕûÀí

- ´´½¨ Hugo ÏîÄ¿¹Ç¼ÜÄ¿Â¼£ºstatic¡¢static/img¡¢static/fonts¡¢themes/snowysonnets/layouts¡¢themes/snowysonnets/static/css¡¢themes/snowysonnets/static/js¡¢content/posts/...¡¢archetypes¡¢.github/workflows¡£
- ½« `img/*` ÒÆ¶¯ÖÁ `static/img/`¡£
- ½« `font-zyqs06el.ttf` ÒÆ¶¯ÖÁ `static/fonts/`¡£
- É¾³ıÒÑÇå¿ÕµÄ¾É `img/` Ä¿Â¼¡£

## 2026-01-01 ÏîÄ¿¹Ç¼ÜÓëÊ¾ÀıÄÚÈİ

- ´´½¨ `hugo.toml`£ºÅäÖÃ baseURL¡¢Ö÷Ìâ¡¢taxonomies¡¢Õ¾µã²ÎÊı¡£
- ´´½¨ `archetypes/posts.md`£ºĞÂ½¨ÎÄÕÂÄ£°å¡£
- ´´½¨Ê¾ÀıÄÚÈİ£º
  - `content/_index.md`
  - `content/posts/_index.md`
  - `content/posts/linux/_index.md`
  - `content/posts/linux/shell/_index.md`
  - `content/posts/linux/shell/³£ÓÃÃüÁî.md`
  - `content/posts/linux/ÏµÍ³¹ÜÀí.md`
  - `content/posts/Ëæ±Ê/µÚÒ»Æª.md`
  - `content/posts/Î´·ÖÀà/µÚÒ»Æª.md`
  - `content/about.md`
  - `content/search.md`

## 2026-01-01 Ö÷ÌâÄ£°åÓë×ÊÔ´

- ´´½¨Ö÷Ìâ»ù´¡Ä£°å£º
  - `themes/snowysonnets/layouts/baseof.html`
  - `partials/head.html`¡¢`header.html`¡¢`footer.html`¡¢`tree.html`¡¢`search-data.html`
  - `index.html`£¨Ê×Ò³ start.png£©
  - `_default/single.html`¡¢`list.html`¡¢`terms.html`¡¢`taxonomy.html`¡¢`categories.html`¡¢`search.html`
  - `posts/list.html`£¨ÎÄÕÂ¿â + ·ÖÀàÏêÇé£©
  - `posts/single.html`£¨ÎÄÕÂ¶ÀÁ¢Ò³£©
  - `404.html`
  - `_default/_markup/render-image.html`¡¢`render-link.html`
- ´´½¨ÑùÊ½£º`themes/snowysonnets/static/css/style.css`
- ´´½¨½Å±¾£º`themes/snowysonnets/static/js/main.js`¡¢`library.js`¡¢`search.js`¡¢`404.js`
- ĞŞ¸Ä `baseof.html`£ºÈ«¾ÖÒıÈë main.js¡£
- ĞŞ¸Ä `hugo.toml`£º½ö±£Áô tag taxonomy£¬·ÖÀà¸ÄÎª×Ô¶¨Òå categories Ò³Ãæ¡£
- ĞÂÔö `content/categories.md`¡£

## 2026-01-01 ²¿ÊğÓëËµÃ÷ÎÄ¼ş

- ´´½¨ `.github/workflows/deploy.yml`£ºpush µ½ main ºó×Ô¶¯¹¹½¨²¢²¿Êğ GitHub Pages¡£
- ´´½¨ `.gitignore`£ººöÂÔ public/ ÓëÏµÍ³ÎÄ¼ş¡£
- ´´½¨ `README.md`£º±¾µØÔ¤ÀÀ¡¢Ìí¼ÓÎÄÕÂ¡¢Ä¿Â¼ËµÃ÷¡£

## 2026-01-01 Ä£°åĞŞÕıÓë²¹³ä

- ÖØ¹¹ `posts/list.html`£º½«Ìõ¼ş·ÖÖ§ÒÆÈëµ¥¸ö `define "main"` ÄÚ²¿£¬±ÜÃâÄ£°å¶¨Òå²»ÎÈ¶¨¡£
- ĞÂÔö¸ùÄ¿Â¼Ê¾ÀıÎÄÕÂ `content/posts/Ğ´ÔÚ¿ªÍ·.md`¡£

## 2026-01-01 ÆäËû

- ĞÂÔö `themes/snowysonnets/theme.toml` Ö÷ÌâÔªĞÅÏ¢¡£
- Î¢µ÷ `library.js`£º·µ»ØÄ¿Â¼Ê±²»ÔÙÎó¸ÄÃæ°üĞ¼±êÌâ¡£

## 2026-01-01 Ï¸½Úµ÷Õû

- µ÷Õû 404 ÆøÅİ»ù´¡³ß´çÎª 260px£¬Ê¹Æä¸ü½Ó½ü¡°»ù±¾ÌîÂúÆÁÄ»¡±µÄĞ§¹û¡£

## 2026-01-01 ËÑË÷Ë÷Òıµ÷Õû

- `search-data.html` Ö»Ë÷Òı `Section = "posts"` µÄÎÄÕÂ£¬±ÜÃâ°Ñ¹ØÓÚ/ËÑË÷µÈÒ³Ãæ»ìÈëËÑË÷½á¹û¡£

## 2026-01-01 ±¾µØÔ¤ÀÀ¼æÈİ

- `search-data.html` µÄËÑË÷Á´½Ó¸ÄÓÃ `RelPermalink`£¬±ÜÃâ±¾µØÔ¤ÀÀÊ±Ìø×ªµ½ÏßÉÏµØÖ·¡£

## 2026-01-01 Ä¿Â¼Ê÷Î¢µ÷

- ÒÆ³ı `tree.html` ÖĞÎ´Ê¹ÓÃµÄ `data-url` ÊôĞÔ£¬Í³Ò»Ê¹ÓÃ `RelPermalink`¡£

## 2026-01-01 ÑùÊ½²¹³ä

- ÎªÒÆ¶¯¶ËÃæ°üĞ¼°´Å¥²¹³äÁ´½ÓÑùÊ½£¬±ÜÃâÄ¬ÈÏ°´Å¥ÑùÊ½Í»Ø£¡£

## 2026-01-01 Ê×Ò³ÒÆ¶¯¶Ëµ÷Õû

- ÒÆ¶¯¶ËÊ×Ò³ÄÚÈİ±£³Ö¿¿ÓÒÏÔÊ¾£¨`margin-left:auto; max-width:82%`£©£¬±ÜÃâÕÚµ² start.png ×ó²àÈËÎï¡£

## 2026-01-01 ·µ»Ø°´Å¥Î»ÖÃ

- ½«ÎÄÕÂÄÚÈİÇøµÄ¡°·µ»Ø¡±°´Å¥ÒÆ¶¯µ½ÕıÎÄÏÂ·½£¬·ûºÏ¡°×óÏÂ½Ç·µ»Ø¡±µÄ×ÀÃæ¶ËĞèÇó¡£
- ¶ÔÓ¦µ÷Õû CSS£ºÎÄÕÂÕıÎÄ flex:1£¬·µ»Ø°´Å¥ margin-top¡£

## 2026-01-01 ÒÆ¶¯¶ËÎÄÕÂ¶¥À¸

- ÎÄÕÂÊÓÍ¼ĞÂÔö `.article-topbar`£ºÒÆ¶¯¶ËÏÔÊ¾¡°·µ»Ø + Ãæ°üĞ¼¡±£¬×ÀÃæ¶ËÍ¨¹ı CSS order ½«·µ»Ø°´Å¥·Åµ½ÕıÎÄÏÂ·½£¨×óÏÂ½Ç·µ»Ø£©¡£
- `library.js` Ôö¼ÓÎÄÕÂÃæ°üĞ¼äÖÈ¾£¬²¢ÔÚ¹Ø±ÕÎÄÕÂÊ±Çå¿Õ¡£

## 2026-01-01 ÑéÖ¤Óë½»¸¶×´Ì¬

- ÒÑÍ¨¹ı Node Óï·¨¼ì²é£º`main.js`¡¢`library.js`¡¢`search.js`¡¢`404.js`¡£
- ÒÑ¼ì²é Hugo Ä£°å¶¨½ç·ûÅä¶Ô£ºËùÓĞ `layouts/**/*.html` µÄ `{{` Óë `}}` ÊıÁ¿Ò»ÖÂ¡£
- µ±Ç°É³Ïä»·¾³ÎŞ·¨ÁªÍø°²×° Hugo£¬Òò´ËÎ´ÄÜÖ´ĞĞ `hugo` ±¾µØ¹¹½¨£»¹¹½¨Óë²¿Êğ½«ÔÚ GitHub Actions ÖĞ×Ô¶¯Íê³É¡£
- ÏîÄ¿½á¹¹¡¢Ö÷Ìâ¡¢Ê¾ÀıÄÚÈİ¡¢²¿ÊğÅäÖÃ¾ùÒÑ¾ÍĞ÷¡£

## 2026-01-01 GitHub Actions ²¿ÊğÊ§°Ü´¦Àí

- ÓÃ»§·´À¡ Build ³É¹¦µ« Deploy Ê§°Ü¡£
- ÔÚ `deploy.yml` ¹¹½¨½×¶ÎĞÂÔö `actions/configure-pages@v5`£¬ÓÃÓÚ×Ô¶¯ÆôÓÃ/ÅäÖÃ GitHub Pages ·¢²¼Ô´¡£
