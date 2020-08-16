import fs from 'fs';
import findGifs from '../services.js';
/* import getGifsUrls from '../../api/api.js';
import { addNewGif, updateHelper } from '../../ui/ui.js'; */

describe('findGifs', () => {
  it('Displays a gif in the webpage if it finds it', async () => {
    const searchQuery = 'dog';
    const event = { preventDefault: () => {} };

    document.body.innerHTML = fs.readFileSync(
      'src/services/__tests__/fixtures/index.html'
    );

    document.querySelector('#search-query').value = searchQuery;

    const getGifsUrls = jest.fn();

    await findGifs(event, getGifsUrls);
    expect(getGifsUrls.mock.calls.length).toBe(1);
  });
});
