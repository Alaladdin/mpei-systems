const crypto = require('crypto');
const { sigHeaderName, sigHashAlgorithm, secrets } = require('../../config').githubWebhooks;

module.exports.webhookMiddleware = async (ctx, next) => {
  const { request } = ctx;
  let isSignaturesEqual = false;

  secrets.forEach((secret) => {
    if (isSignaturesEqual) return false;

    const signature = request.get(sigHeaderName);

    if (signature) {
      const hmac = crypto.createHmac(sigHashAlgorithm, secret);
      const expectedSignature = `${sigHashAlgorithm}=${hmac.update(JSON.stringify(request.body)).digest('hex')}`;

      isSignaturesEqual = signature === expectedSignature;
    }
  });

  if (!isSignaturesEqual)
    ctx.throw(401);

  await next();
};
