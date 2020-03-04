const _ = require('lodash')
const casual = require('casual')

casual.seed(0)

exports.seed = function(knex) {
  return knex('track')
    .del()
    .then(() => {
      return knex
        .select('id')
        .from('range')
        .then(ranges => {
          return Promise.all(
            ranges.map((range, i) => {
              return populateRange(knex, range.id)
            }))
        })
    })
}

const populateRange = (knex, range_id) => {
  const tracks =_.times(7, _.partial(casual._shooting_track, range_id))

  return knex('track')
    .insert(tracks)
}

casual.define('shooting_track_desc', function() {
  track = {
    name: [
      'Pistol'
      , 'Shotgun'
      , 'Rifle'
      , 'Indoor'
    ]
    , distance: [
      '10m'
      , '25m'
      , '50m'
      , '100m'
      , '150m'
      , '200m'
      , '300m'
    ]
  }

  return track.name[casual.integer(0, track.name.length -1 )]
    + ' ' + track.distance[casual.integer(0, track.distance.length - 1)]
})
              
casual.define('shooting_track', function(range_id, n) {
  return {
    range_id: range_id
    , name: 'Shooting Track ' + n
    , description: casual.shooting_track_desc
  }
})
