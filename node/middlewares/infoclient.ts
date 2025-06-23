export async function infoClientMiddleware(
  context: Context,
  next: () => Promise<unknown>
) {
  const { clients } = context

  context.status = 200
  context.body = await clients.infoclient.getInfo()
  context.set('cache-control', 'no-cache')

  await next()
}
