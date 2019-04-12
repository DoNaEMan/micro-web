const Router = require('koa-router');

const router = new Router();

router.post('/test', async (ctx, next) => {
  console.log('request /api/test。。。。');
  ctx.state = 200;
  ctx.body = 'I am fine!';
  return next();
});

module.exports = router;
