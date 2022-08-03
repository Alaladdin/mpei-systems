const crypto = require('crypto');
const { sigHeaderName, sigHashAlgorithm, secrets } = require('../../config').githubWebhooks;

module.exports.webhookMiddleware = async (ctx, next) => {
  const { request } = ctx;
  const isSignaturesEqual = secrets.some((secret) => {
    const signature = request.get(sigHeaderName);

    if (signature) {
      const hmac = crypto.createHmac(sigHashAlgorithm, secret);
      const expectedSignature = `${sigHashAlgorithm}=${hmac.update(JSON.stringify(request.body)).digest('hex')}`;

      return signature === expectedSignature;
    }

    return false;
  });

  if (!isSignaturesEqual)
    ctx.throw(400);

  await next();
};
