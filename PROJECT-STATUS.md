# Road Rage — Project Status

Last updated: April 7, 2026

## Live URLs
- **Website**: https://yousuckatdriving.net (Vercel auto-deploy from GitHub main)
- **Bonfire merch store**: https://www.bonfire.com/stay-out-of-the-fast-lane
- **GitHub repo**: https://github.com/virtualcocco/road-rage (private)

## Accounts & Credentials
- **GitHub**: virtualcocco — PAT stored in Cowork session context (not committed for security)
- **Supabase project**: coziheqifnyjchhwfdhy
  - URL: `https://coziheqifnyjchhwfdhy.supabase.co`
  - Credentials in `.env.local` (not committed)
- **Bonfire seller account**: "You Suck At Driving" (theteamcocco@gmail.com)
- **Canva**: theteamcocco@gmail.com — shirt design ID: `DAHGLxw_o4k`
- **Vercel**: auto-deploys from GitHub main branch

## Tech Stack (Implemented)
- **Framework**: Next.js App Router with TypeScript and Tailwind CSS
- **Hosting**: Vercel (auto-deploy on push to main)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Custom admin password auth (no user accounts yet)
- **Merch**: Bonfire print-on-demand (linked from merch page)
- **Affiliate**: Amazon Associates (tag: yousuckatdriv-20)
- **Design tool**: Canva (theteamcocco@gmail.com)

## Deployed Pages
1. **Homepage** (`/`) — hero section, how-it-works, driver archetypes preview, merch teaser
2. **Report a Driver** (`/report`) — submission form with categories, optional media upload
3. **Driver Archetypes** (`/archetypes`) — humorous driver type profiles
4. **Trends / Stats** (`/trends`) — anonymous aggregated data
5. **Merch & Gear** (`/merch`) — Bonfire merch + Amazon affiliate dash cams + accessories
6. **Admin** (`/admin`) — moderation queue (password protected)

## Git Push Method
The remote URL is plain `https://github.com/virtualcocco/road-rage.git` so pushes require the PAT inline:
```
git push https://x-access-token:<GITHUB_PAT>@github.com/virtualcocco/road-rage.git main
```

## Merch — Live Products

### "Stay Out of the Fast Lane!" Collection (Bonfire)
- **Campaign URL**: https://www.bonfire.com/stay-out-of-the-fast-lane
- **Campaign UUID**: 253d6ac7-dfcc-48e3-88ad-a1372d2c2edf
- **Design**: Canva design `DAHGLxw_o4k` — includes:
  - "STAY OUT OF THE FAST LANE!" title text
  - "YOUSUCKATDRIVING.NET" URL
  - "Report drivers that suck" tagline
  - MUTCD R4-3 "Slower Traffic Keep Right" road sign
- **Styles & Prices**:
  - Premium Unisex Tee: $27.99 (base $19.44, profit $8.55)
  - Classic Unisex Tee: $24.99 (base $18.03, profit $6.96)
  - Softstyle Pullover Hoodie: $41.99 (base $31.01, profit $10.98)
  - Softstyle Crewneck Sweatshirt: $39.99 (base $29.26, profit $10.73)
- **Color**: Solid Black Blend (premium), Black (classic/hoodie/crewneck)
- **Fulfillment**: On-demand, shipped by Bonfire
- **Seller name**: You Suck At Driving
- **Category**: Fundraiser
- **Status**: Live / On Demand

### Amazon Affiliate Products (on merch page)
- **Dash cams**: Vantrue N4 Pro ($320), Garmin 67W ($195), VIOFO A129 ($158), Nexar Beam ($120)
- **Accessories**: Student Driver magnets, Dash Cam Recording stickers, Use Your Blinkers sticker, If I Passed You on the Right sticker

## Key Files in Repo
- `src/app/merch/page.tsx` — Merch page with Bonfire URL and affiliate products
- `public/merch-styles.png` — Composite mockup image (4 product styles: tee, classic tee, hoodie, crewneck)
- `public/r4-3-sign.png` — MUTCD R4-3 sign image (1200x1507)
- `public/stay-out-fast-lane.png` — Original design composite (deployed to site)
- `public/stay-out-fast-lane.svg` — SVG version of design
- `.env.local` — Supabase credentials and admin password

## Canva Assets
- **Design ID**: DAHGLxw_o4k (shirt design with all text and sign)
- **Page ID**: PBJmxHh7sgGXnpzm (1587x2245)
- **Key element IDs**:
  - Title text: LBjHypN6M4LzjpkY
  - URL text: LBTyBntVMpZHpzfW
  - R4-3 sign image: LBpSDbS1HSxbzPdF
- **Uploaded sign asset ID**: MAHGL_yDV_o

## Bonfire Mockup Image URLs
These are the dynamic Bonfire CDN URLs for product mockups (useful for website/marketing):
- **Premium Tee**: `https://dynamic.bonfireassets.com/thumb/design-image/66c93c3c-973f-44fc-b263-2235b4d57042/7329f207-b69c-4f7e-8322-9f628fd81358/900/`
- **Classic Tee**: `https://dynamic.bonfireassets.com/thumb/design-image/66c93c3c-973f-44fc-b263-2235b4d57042/b2b20823-8669-43b2-ab74-7eab5a447081/900/`
- **Hoodie**: `https://dynamic.bonfireassets.com/thumb/design-image/66c93c3c-973f-44fc-b263-2235b4d57042/fe44b69b-5649-40d5-82c5-27581d643247/900/`
- **Crewneck**: `https://dynamic.bonfireassets.com/thumb/design-image/66c93c3c-973f-44fc-b263-2235b4d57042/764ac767-7e50-44a7-960a-847b9a37b8a9/900/`

## Known Issues & Workarounds
- **Chrome file_upload blocked by CDP**: Can't use Chrome MCP `file_upload` for Bonfire uploads. Workaround: use JavaScript `fetch()` to download the image, then `DataTransfer` API to programmatically set files on the `<input type="file">` element and dispatch a change event.
- **Computer-use Chrome at "read" tier**: Can see Chrome screenshots but can't click/type in Chrome. All browser interaction must go through Chrome MCP tools instead.
- **Canva export black background**: When exporting with `transparent_background: true`, the page background is removed but any design elements (like a black rectangle) remain. Solution: ensure the Canva design only has the actual content elements (text + images), no background shapes.
- **Bonfire design editing requires draft mode**: To change the design on a live campaign, must click "Revert to draft" first (takes campaign offline temporarily), make changes, then re-launch through the full 4-step flow (Design > Profits > Settings > Edit & Preview > Launch).
- **Bonfire launch modal**: After clicking Launch, must check "I agree to Bonfire's Privacy Policy & Terms" checkbox and click "Confirm & launch". Then skip through social sharing prompts ("Skip for now" / "Maybe later") to get to the live page.

## What's Next (Post-MVP)
- More merch designs (see references/merch-ideas.md for slogans)
- Social media automation
- Owner claim flow (vehicle owners see aggregated anonymous feedback)
- Notification system
- Full merch shop integration
- Email waitlist campaigns
- Fake citation cards / joke products
