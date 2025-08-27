# Languages & Regional Search in LaunchGenie

LaunchGenie offers multilingual support and region-specific intelligence to guide entrepreneurs anywhere in the world. This document summarizes how languages and regional search work, and lists sample best results per region to illustrate the tailored outputs.

## Supported Languages

LaunchGenie’s natural language interface works across multiple languages and automatically localises key resources, documents and regulatory insights. Currently supported languages include English, Italian, French, Spanish, German and Portuguese. Additional languages are planned for future expansions.

## Regional Search Capabilities

LaunchGenie uses the user’s country, state/region and city to identify relevant business registration codes, regulatory steps and vendor resources. The platform leverages region-specific classification systems such as:

* **NAICS (US)** – North American Industry Classification System codes.
* **NAF (France)** – Nomenclature d’Activités Française codes.
* **ATECO (Italy)** – Codice ATECO classification.

By searching these codes and local regulators, LaunchGenie can assemble tailored tasks, permits, shopping lists and email templates.

## Best Results by Region (Examples)

| **Region** | **Idea** | **Codes & Permits** | **Outputs** |
|---|---|---|---|
| USA (California) | Food Truck | NAICS 722330; Seller’s Permit; Food Handler Permit | Health inspection tasks; vehicle lease; vendor list |
| Italy (Tuscany) | Billiards & Hookah Lounge | ATECO 56.29; SCIA; HACCP; SAB/REC licence | Municipal permits; equipment vendors; Italian emails |
| France (Île-de-France) | Smart Café | NAF 56.30Z; Licence III/IV; HACCP training | SAS registration tasks; VAT setup; French investor emails |
| Nigeria (Lagos) | Fintech Payment App | CAC registration; NIBSS licence; CBN approval | Capital requirements; NIBSS integration; partnership emails |

These examples illustrate how LaunchGenie adapts to different languages and regulatory environments to deliver regionally appropriate guidance. You can add more scenario packs in `data/sample_scenarios/` to support additional regions and business ideas.

## How to Use Regional Search

When interacting with LaunchGenie, always specify at least the country and state/region to receive the most accurate guidance. For example:

```
Country: France  
Region: Île-de-France  
City: Paris  
Business Idea: Smart Café  
```

LaunchGenie will then use the appropriate classification system (NAF codes), local permits, and language-specific templates to produce a detailed plan.

---

Prepared by LaunchGenie Ops AI
