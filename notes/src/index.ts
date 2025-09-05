import { Hono } from 'hono'
import { Redis } from "@upstash/redis/cloudflare"
import { env } from 'hono/adapter'


type Bindings = {
  UPSTASH_REDIS_REST_URL: string
  UPSTASH_REDIS_REST_TOKEN: string
}

const app = new Hono<{Bindings:Bindings}>()
async function getNotes () {
  while (true){
    console.log('fsdf')
  }
}
getNotes()
app.get('/', async (c) => {
    const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = env<Bindings>(c)
    
    const redis = new Redis({
      url: UPSTASH_REDIS_REST_URL,
      token: UPSTASH_REDIS_REST_TOKEN
    })
    
    await redis.set("data", "ranjit");
    return c.text('Hello Hono!');
  })
export default app
