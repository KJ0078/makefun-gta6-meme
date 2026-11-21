# GTA 6 meme — a make.fun bounty entry

An entry for make.fun's [Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01)
bounty, entered by @elnmsk.

The entry is the post itself:

- **Post:** https://x.com/ankurjain4234/status/2124048690398859503
- **The meme:** a midnight launch queue on a neon Leonida street. The back of
  the line has grown grey beards over the 13-year wait for GTA 6; the make.fun
  ghost at the front earned his copy on make.fun instead. Caption: "13 YEARS
  IN THE GTA 6 QUEUE… …THE GHOST EARNED HIS ON make.fun".

## What the program does

`main.ts` (Node 22, standard library only) is all the machinery the bounty
needs: it reads `POST.json` at the repository root, checks the url really is
an X post address, canonicalises it (x.com + handle + status id, tracking
query stripped) and writes it to the output directory, where the gate reads
it. The house reads the post from X itself; nothing else is judged.

Run it the way the kit does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

MIT licensed — see `LICENSE`.
