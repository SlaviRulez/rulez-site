# RULEZ — sito ufficiale, anteprima GitHub Pages

Sito statico ricavato dalla V3 approvata. Hero e tre video sono file locali. Il menu Music porta a In the Booth; REC 002 è incorporato con il player ufficiale SoundCloud.

## Le due pagine da conoscere

- **Repository:** https://github.com/SlaviRulez/rulez-site — è la cartella online con i file e la loro cronologia.
- **Sito:** https://slavirulez.github.io/rulez-site/ — è l'indirizzo previsto per l'anteprima pubblicata con GitHub Pages.

Il dominio rulezmusic.com non viene configurato in questa fase. Non aggiungere un file CNAME o un dominio personalizzato finché l'anteprima non è approvata.

## Cambiare un contenuto

1. Nel repository apri `content.json`.
2. Premi la matita (Edit this file).
3. Modifica il testo fra virgolette, mantenendo virgole e parentesi. Non cambiare i nomi dei campi.
4. Premi **Commit changes**, scrivi una descrizione breve della modifica e conferma. Un commit è un salvataggio con una voce nella cronologia.
5. Attendi la pubblicazione e ricarica il sito. La sezione **Actions** mostra se l'aggiornamento è completato.

Campi principali:

- `forthcoming`: prossime uscite; ogni voce ha `year`, `title`, `label` e un `url` facoltativo.
- `releases`: uscite pubblicate, nello stesso formato. Per aggiungerne una, duplica un oggetto completo nell'elenco separandolo con una virgola.
- `projects`: progetti, con titolo, ruolo, descrizione e link facoltativo.
- `media_support`: elenco dei nomi già presenti nella V3.
- `text`: testi della pagina. Le chiavi servono al sito per identificare i contenuti; modifica solo i valori a destra.
- `links`: destinazioni dei collegamenti, compresi i contatti `mailto:`.
- `media`: percorsi dei file locali.
- `soundcloud_mix`: titolo, link pubblico e `embed_url`. Per un altro mix puoi usare il suo link pubblico SoundCloud anche come `embed_url`.

Quando cambi un indirizzo email aggiorna sia il testo in `text` sia il relativo `mailto:` in `links`.

## Sostituire foto o video

Apri `media` nel repository e scegli **Add file → Upload files**. Carica il nuovo file con lo stesso nome, quindi salva con **Commit changes**. I nomi attuali sono `hero.jpg`, `dj-main.mp4`, `media-1.mp4`, `media-2.mp4`. Usa MP4 compatibili con il browser, preferibilmente H.264/AAC. Non caricare gli ZIP: il sito usa direttamente i singoli file.

## Struttura

```text
index.html       struttura e copia di sicurezza dei contenuti V3
css/style.css    grafica originale e adattamenti responsive
js/main.js       lettura contenuti e gestione video
content.json    contenuti modificabili
media/          hero e tre video
.nojekyll       pubblicazione diretta dei file statici
```

Non servono Canva, un database o pacchetti da aggiornare. SoundCloud resta un servizio esterno e richiede una connessione: il link diretto sotto il player consente di aprire il mix separatamente.

## Anteprima locale e ripristino

Per l'uso locale occorre un piccolo server HTTP (non aprire semplicemente il file con doppio clic). Per esempio, dalla cartella del sito: `python -m http.server 8765`; poi apri `http://localhost:8765`.

Se `content.json` non si carica, la pagina mantiene i contenuti V3 inclusi nell'HTML. Questa copia di sicurezza non si aggiorna automaticamente quando modifichi il JSON. Per annullare un errore, recupera il contenuto precedente dalla cronologia del file e salvalo nuovamente, oppure chiedimi di ripristinare il salvataggio precedente.

## GitHub Pages

In **Settings → Pages**, scegli **Deploy from a branch**, branch **main**, cartella **/(root)**. Il campo **Custom domain** deve restare vuoto. Il repository è pubblico, quindi codice e media pubblicati sono visibili; i diritti sui contenuti artistici restano dei rispettivi titolari.
