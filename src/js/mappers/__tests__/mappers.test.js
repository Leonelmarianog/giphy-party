import { fromAPIToEntity, fromStorageToEntity } from '../mappers.js';
import GifCollection from '../../entities/GifCollection.js';
import dogGifsFixture from './fixtures/dogGifsFixture.json';

describe('fromApiToEntity', () => {
  it('Maps API data into a GifCollection entity', () => {
    const gifCollection = fromAPIToEntity('dogs', dogGifsFixture);

    expect(gifCollection).toBeInstanceOf(GifCollection);
    expect(gifCollection.name).toBe('dogs');
    expect(gifCollection.gifs).toBeInstanceOf(Array);
  });
});

describe('fromStorageToEntity', () => {
  it('Maps localStorage data into a GifCollection entity', () => {
    const gifCollectionData = {
      name: 'dogs',
      gifs: ['dog1', 'dog2', 'dog3'],
    };

    const gifCollection = fromStorageToEntity(gifCollectionData);

    expect(gifCollection).toBeInstanceOf(GifCollection);
    expect(gifCollection.name).toBe('dogs');
    expect(gifCollection.gifs).toBeInstanceOf(Array);
  });
});
