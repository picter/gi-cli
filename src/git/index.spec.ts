import { getChangeLog, slugifyTitle } from '.';

test('Convert regular issue title to branch name (slugify).', () => {
  expect(slugifyTitle('Sanitize branch name')).toEqual('sanitize-branch-name');
});

test('Convert issue title with ` to branch name (slugify).', () => {
  expect(
    slugifyTitle(
      'Implement flag props like `nopaddings` and `nomargins` on text components',
    ),
  ).toEqual(
    'implement-flag-props-like-nopaddings-and-nomargins-on-text-components',
  );
});

test('Convert issue title with brackets to branch name (slugify).', () => {
  expect(slugifyTitle('Some random title (with some extra words)')).toEqual(
    'some-random-title-with-some-extra-words',
  );
});

test('Convert issue title with " to branch name (slugify).', () => {
  expect(
    slugifyTitle('Remove "Evaluation active" from round navigation items'),
  ).toEqual('remove-evaluation-active-from-round-navigation-items');
});

const dummyLog = {
  "all": [
    {
      "hash": "eb78cdca287e8809f273c9e9606468db0428aade",
      "date": "2018-06-01 17:18:02 -0300",
      "message": "feat: update readme with roadmap section",
      "author_name": "lucasfs7",
      "author_email": "lucasfs7@gmail.com"
    },
    {
      "hash": "0bd1bb588e33a468a3effe988bc23866864c0d29",
      "date": "2018-06-01 17:16:29 -0300",
      "message": "add conventional-commits-parser package",
      "author_name": "lucasfs7",
      "author_email": "lucasfs7@gmail.com"
    }
  ],
  "latest": {
    "hash": "eb78cdca287e8809f273c9e9606468db0428aade",
    "date": "2018-06-01 17:18:02 -0300",
    "message": "feat: update readme with roadmap section",
    "author_name": "lucasfs7",
    "author_email": "lucasfs7@gmail.com"
  },
  "total": 2
};
const mockLog = jest.fn().mockResolvedValue(dummyLog);
jest.mock('simple-git/promise', () => (pwd: string) => {
  return {
    log: mockLog,
    status: jest.fn().mockResolvedValue({ current: 'branch-name' }),
  };
});

test('Generates changelog from repo commits', async () => {
  expect(await getChangeLog('master'))
    .toEqual([
      {
        "type": "feat",
        "scope": null,
        "subject": "update readme with roadmap section",
        "merge": null,
        "header": "feat: update readme with roadmap section",
        "body": null,
        "footer": null,
        "notes": [],
        "references": [],
        "mentions": [],
        "revert": null
      },
    ]);
});
