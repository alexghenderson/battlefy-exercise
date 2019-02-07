import React from 'react';
import get from 'lodash.get';

const ItemsOverview = ({ items }) => {
  return (
    <div
      css={`
        grid-area: items;
        display: grid;
        grid-template-columns: 3em 3em 3em;
      `}
    >
      <div
        css={`
          width: 1.5em;
          height: 1.5em;
          border: 1px solid silver;
        `}
      >
        {items[0] !== null && (
          <img src={`https://s3-us-west-2.amazonaws.com/battlefy-demo/img/item/${items[0].image}`} />
        )}
      </div>
      <div
        css={`
          width: 1.5em;
          height: 1.5em;
          border: 1px solid silver;
        `}
      >
        {items[1] !== null && (
          <img src={`https://s3-us-west-2.amazonaws.com/battlefy-demo/img/item/${items[1].image}`} />
        )}
      </div>
      <div
        css={`
          width: 1.5em;
          height: 1.5em;
          border: 1px solid silver;
        `}
      >
        {items[2] !== null && (
          <img src={`https://s3-us-west-2.amazonaws.com/battlefy-demo/img/item/${items[2].image}`} />
        )}
      </div>
      <div
        css={`
          width: 1.5em;
          height: 1.5em;
          border: 1px solid silver;
        `}
      >
        {items[3] !== null && (
          <img src={`https://s3-us-west-2.amazonaws.com/battlefy-demo/img/item/${items[3].image}`} />
        )}
      </div>
      <div
        css={`
          width: 1.5em;
          height: 1.5em;
          border: 1px solid silver;
        `}
      >
        {items[4] !== null && (
          <img src={`https://s3-us-west-2.amazonaws.com/battlefy-demo/img/item/${items[4].image}`} />
        )}
      </div>
      <div
        css={`
          width: 1.5em;
          height: 1.5em;
          border: 1px solid silver;
        `}
      >
        {items[5] !== null && (
          <img src={`https://s3-us-west-2.amazonaws.com/battlefy-demo/img/item/${items[5].image}`} />
        )}
      </div>
    </div>
  );
};

const StatsOverview = ({ kills, deaths, assists, level, creepScore, duration }) => {
  return (
    <div
      css={`
        display: grid;
        grid-area: stats;
        grid-template-areas: 'stats stats level' 'kda kda creep';
      `}
    >
      <div
        css={`
          grid-area: stats;
        `}
      >
        {kills} / {deaths} / {assists}
      </div>
      <div
        css={`
          grid-area: kda;
        `}
      >
        {deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(2)} KDA
      </div>
      <div
        css={`
          grid-area: level;
        `}
      >
        Level {level}
      </div>
      <div
        css={`
          grid-area: creep;
        `}
      >
        {creepScore} ({((creepScore * 60) / duration).toFixed(1)}) CS
      </div>
    </div>
  );
};

const ChampionOveriew = ({ champion, spell1, spell2 }) => {
  return (
    <div
      css={`
        display: grid;
        grid-area: champ;
        grid-template-areas: 'champ champ spell1' 'champ champ spell2' 'name name _';
      `}
    >
      <img
        css={`
          width: 3em;
          height: 3em;
          border-radius: 50%;
          border: 1px solid silver;
          grid-area: champ;
          margin-left: auto;
          margin-right: auto;
        `}
        src={
          champion
            ? `https://s3-us-west-2.amazonaws.com/battlefy-demo/img/champion/${champion.image}`
            : ''
        }
      />
      <div
        css={`
          grid-area: name;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        `}
      >
        {champion ? champion.name : 'Unknown'}
      </div>
      <img
        css={`
          width: 1.5em;
          height: 1.5em;
          border-radius: 50%;
          border: 1px solid silver;
          grid-area: spell1;
        `}
        src={
          spell1 ? `https://s3-us-west-2.amazonaws.com/battlefy-demo/img/spell/${spell1.image}` : ''
        }
      />
      <img
        css={`
          width: 1.5em;
          height: 1.5em;
          border-radius: 50%;
          border: 1px solid silver;
          grid-area: spell2;
        `}
        src={
          spell2 ? `https://s3-us-west-2.amazonaws.com/battlefy-demo/img/spell/${spell2.image}` : ''
        }
      />
    </div>
  );
};

const MatchOverview = ({ match }) => {
  const champion = get(match, 'perspective.data.champion');
  const spells = get(match, 'perspective.data.spells');
  const keystone = get(match, 'perspective.data.masteries.keystone');
  const data = get(match, 'perspective.data');
  return (
    <div
      css={`
        &:not(:first-child) {
          margin-top: 1em;
        }
        display: grid;
        grid-template-areas: 'champ stats items';
        border: 1px solid silver;
        padding: 1em;
      `}
    >
      <ChampionOveriew
        champion={champion}
        spell1={spells[0]}
        spell2={spells[1]}
        keystone={keystone}
      />
      <StatsOverview
        kills={data.kills}
        deaths={data.deaths}
        assists={data.assists}
        creepScore={data.creepScore}
        level={data.level}
        duration={match.duration}
      />
      <ItemsOverview items={data.items} />
    </div>
  );
};

export default MatchOverview;
