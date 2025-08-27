# Scenario Packs

LaunchGenie uses **scenario packs** to pre‑define the steps, permits, budgets and email templates for common startup ideas in specific regions. A scenario pack is a JSON file that lives in the `data/sample_scenarios/` directory and can be selected automatically by the planning engine when a founder specifies their region and idea.

Each scenario pack must include the following keys:

| Key             | Description                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `id`            | Unique identifier for the pack. Use hyphenated lowercase (e.g. `xspaces_italy`).                                      |
| `region`        | Object describing the target geography: `country`, `state` (or province) and optionally `city`.                       |
| `idea`          | Text describing the business concept or vertical (e.g. “Billiards & Hookah Lounge”).                                  |
| `codes`         | Optional classification codes (e.g. NAF/SIC/NAICS) that might assist regulatory lookup.                               |
| `permits`       | Array of permit objects; each permit has a `name`, `description` and optional `link` to a government portal.          |
| `tasks`         | Array of tasks with `title`, `description` and optional dependencies or due‑dates.                                     |
| `shopping`      | Array of items to purchase, rent or license; each item may include a `name`, `quantity` and vendor `links`.           |
| `budgets`       | Array of budget tiers, each with a `range` (e.g. “< €5k”), `summary` and list of what’s achievable at that budget.     |
| `emails`        | Object containing pre‑written email templates for stakeholders (e.g. landlord, vendor, investor).                     |

### Example Pack File

```json
{
  "id": "xspaces_italy",
  "region": { "country": "Italy", "state": "Tuscany", "city": "Fucecchio" },
  "idea": "Billiards & Hookah Lounge (Xspaces)",
  "codes": { "NAF": ["563000"] },
  "permits": [
    { "name": "SCIA", "description": "Self‑certification start of activity", "link": "https://www.impresainungiorno.gov.it/" },
    { "name": "HACCP", "description": "Food safety plan required for handling drinks and snacks" },
    { "name": "SAB/REC", "description": "Licence to serve alcoholic beverages" }
  ],
  "tasks": [
    { "title": "Define brand & concept", "description": "Develop the lounge theme, branding and customer experience." },
    { "title": "Incorporate company", "description": "Register legal entity (S.r.l. or similar) and obtain tax ID." },
    { "title": "Secure location", "description": "Search for spaces, negotiate lease and sign contract.", "depends_on": ["Define brand & concept"] },
    { "title": "Obtain permits", "description": "File SCIA, HACCP and SAB/REC applications with the municipality.", "depends_on": ["Incorporate company"] },
    { "title": "Purchase equipment", "description": "Order billiard tables, hookah sets, POS systems and furniture.", "depends_on": ["Secure location"] },
    { "title": "Hire staff", "description": "Recruit bartenders, servers and operations staff." },
    { "title": "Launch marketing", "description": "Promote opening via social media, flyers and influencer outreach." }
  ],
  "shopping": [
    { "name": "Billiard tables", "quantity": 4, "links": ["https://example.com/billiard-table"] },
    { "name": "Hookah sets", "quantity": 8, "links": ["https://example.com/hookah"] },
    { "name": "Bar & lounge furniture", "links": ["https://example.com/lounge-furniture"] },
    { "name": "Point‑of‑sale system", "links": ["https://example.com/pos"] }
  ],
  "budgets": [
    { "range": "< €5 000", "summary": "Shoestring launch with minimal furnishings and second‑hand tables.", "items": ["Used billiard table", "Second‑hand couches", "DIY marketing"] },
    { "range": "€5 000–€25 000", "summary": "Standard launch with new equipment and modest décor.", "items": ["New tables", "POS system", "Marketing campaign"] },
    { "range": "> €25 000", "summary": "Premium launch with high‑end furnishings and VIP lounge.", "items": ["Custom tables", "Luxury seating", "Professional interior design"] }
  ],
  "emails": {
    "landlord": "Dear <Landlord>,\n\nI’m writing to inquire about the commercial space at <address>. ...",
    "vendor": "Hello <Vendor>,\n\nWe are opening a billiards & hookah lounge and would like to place an order for ...",
    "investor": "Dear <Investor>,\n\nWe’re excited to share our concept for Xspaces and seek your support ..."
  }
}
```

To add more scenarios, copy the example JSON file, adjust the fields for your region and concept, and save it in the `data/sample_scenarios/` folder.
