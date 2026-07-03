const leaseItems=['Permitted use expressly includes self-storage, customer access and business storage.','Landlord authorises internal demountable partitions, doors, access control, CCTV, alarm and signage.','Lease starts only after satisfactory technical, planning and fire due diligence.','Minimum 3-month rent-free fit-out period agreed.','Tenant break option after 12–18 months without excessive penalty.','Clear schedule of property condition and pre-existing defects attached.','Landlord remains responsible for roof, structure and major plant defects.','Dedicated parking/loading rights and access hours are written into the lease.','Utilities are separately metered and historic bills disclosed.','Rent indexation is capped; service charges and extraordinary costs are defined.','Assignment/subletting rules allow future company restructuring or financing.','Restoration obligation excludes approved works and normal wear.'];document.getElementById('leaseChecklist').innerHTML=leaseItems.map((x,i)=>`<label class="check"><input type="checkbox" data-check="lease-${i}"><span>${x}</span></label>`).join('');async function copyText(text,msg){await navigator.clipboard.writeText(text);document.getElementById('copyStatus').textContent=msg||'Copied to clipboard.'}function copyLeaseMessage(){copyText(`Buongiorno,

prima di procedere con la locazione dell'immobile di Via di Burello 26, avrei bisogno di confermare per iscritto:

1. uso per deposito/self-storage e accesso dei clienti;
2. installazione di pareti modulari, porte, videosorveglianza, allarme, controllo accessi e insegna;
3. disponibilità dei documenti urbanistici, catastali, agibilità, impianti e prevenzione incendi;
4. periodo iniziale senza canone per verifiche e allestimento;
5. recesso se le autorizzazioni non risultano ottenibili;
6. responsabilità per tetto, struttura, impianti principali e difetti preesistenti;
7. parcheggi, carico/scarico e orari di accesso.

Procederò soltanto dopo una verifica tecnica e contrattuale completa.

Cordiali saluti,
Senibo Omi-Jaja`)}function copyTechnicalBrief(){copyText(`OGGETTO: Verifica tecnica preliminare — Via di Burello 26, Fucecchio

Sto valutando l'ex laboratorio/tomaificio per realizzare VAULTZ. La prima fase usa un solo capannone, gli uffici, la cucina/refettorio e i servizi. L'attività iniziale è deposito/self-storage con unità modulari e accesso controllato.

Verificare per iscritto: destinazione d'uso e compatibilità urbanistica; agibilità e conformità catastale; SCIA o cambio d'uso; impianti; prevenzione incendi e carico d'incendio; vie di esodo e compartimentazione; accessibilità; pareti modulari; parcheggio e carico/scarico; lavori obbligatori.

Servono rilievo metrico, planimetria aggiornata, stima lavori, pratiche, costi e tempi.`,'Technical brief copied.')}