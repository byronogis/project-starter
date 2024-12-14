# Project Starter

## Solve turbo watch

```shell
# × discovery failed: bad grpc status code: The operation was cancelled
# https://github.com/vercel/turborepo/issues/9536
ps axu | grep turbo
kill -9 <pid>

# rerun turbo watch, maybe need **try twice**
# once maybe interrupt: WARNING  stale pid file at "/tmp/turbod/9a01dbb6f5ac6c77/turbod.pid"
turbo watch [task]
```
