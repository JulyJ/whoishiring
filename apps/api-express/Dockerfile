FROM denoland/deno

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN deno install --entrypoint main.ts

RUN addgroup --system --gid 1001 apiexpress
RUN adduser --system --uid 1001 apiexpress
USER apiexpress

CMD ["run", "--allow-net", "--allow-read", "--allow-env", "--allow-sys", "--allow-run", "--env", "main.ts"]
