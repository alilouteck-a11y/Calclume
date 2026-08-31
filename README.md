# CalcLume

Clear calculators that show the work.

Production domain: [https://calclume.com](https://calclume.com)

## Stack

- Next.js 16 (App Router) with `output: "export"`
- TypeScript (strict)
- Tailwind CSS v4
- Vitest

Calculations run locally in the browser. There is no backend, database, authentication, analytics, or CMS in the current production build.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run build` writes a static site to `out/`.

## Deployment

Upload the contents of `out/` to a static host (for example Hostinger static hosting).

See:

- `Docs/Phase2_3HostingerDeployment.md`
- `Docs/Phase2_3PostDeploymentChecklist.md`

Do not deploy credentials, source maps with secrets, or the `Docs/` folder as a public product surface unless intentionally desired.

## Published calculator

- Mean Absolute Deviation: `/calculators/statistics/mean-absolute-deviation/`

## License / contact

Contact: hello@calclume.com
