
export const PromiseTimeout = async <T=any>(
  promise:Promise<T>,
  timeout:number=5000,
  name?:string
) => {
  const method = name ? `${name} method` : `method`

  let timer:NodeJS.Timeout
  const timePromise = new Promise((res, rej) => {
    timer = setTimeout(() => rej(`The ${method} timed out after ${timeout} ms.`), timeout)
  })

  return await Promise.race([promise, timePromise])
    .finally(() => clearTimeout(timer))
}
