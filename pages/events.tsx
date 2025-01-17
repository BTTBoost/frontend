import React, { useState } from 'react'
import { AddFilter } from '../components/AddFilter'
import { HoldsNFT } from '../components/HoldsNFT'
import { OwnsCrypto } from '../components/OwnsTokens'
import { useFilters } from '../hooks/useFilters'
import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import dynamic from 'next/dynamic'
import { Select } from '../components/Select'
import { EventInfo, events } from '../data/events'
import { CurrentValue } from '../components/select/CurrentValue'
import { SelectOption } from '../components/select/Option'
import { fetchChart } from '../lib/fetchFilters'
import { useLazyEffect } from '../hooks/useLazyEffect'
import { fetchEvent } from '../lib/fetchEvent'
import { ChartData } from '../lib/types'
import { ExternalLink } from 'react-external-link'
import { createHeader } from '../lib/createHeader'

const Chart = dynamic(() => import('../components/Charts'), { ssr: false })

const styles = { ...indexStyles, ...shared }

const Events = () => {
  const filters = useFilters((state) => state.filters)
  const [chartData, setChartData] = useState<ChartData>()
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)
  const [event, setEvent] = useState<EventInfo>()

  const [header, setHeader] = useState('')

  const fetchAllData = () => {
    setLoading(true)

    setHeader(createHeader(filters, event))
    const res = event?.value ? fetchEvent(filters, event) : fetchChart(filters)

    res
      .then((res) => {
        if (res.status !== 200) {
          return setError(res.statusText)
        } else return res.json()
      })
      .then((json) => {
        setLoading(false)
        if (json) {
          setChartData(json)
          setError(undefined)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  useLazyEffect(() => {
    fetchAllData()
  }, [event])

  return (
    <main className={`${styles.column} ${indexStyles.main}`}>
      <div className={styles.column} style={{ gap: '10px', marginBottom: '45px' }}>
        <h3 className={styles.h3}>Filter users</h3>
        <div className={styles.list}>
          {filters.map((filter) => {
            switch (filter.type) {
              case 'erc20':
                return <OwnsCrypto key={filter.id} filter={filter} />
              case 'nft':
                return <HoldsNFT key={filter.id} filter={filter} />
            }
          })}
        </div>

        <div className={styles.row} style={{ justifyContent: 'space-between' }}>
          <AddFilter />
          <button
            className={indexStyles.queryButton}
            onClick={() => {
              fetchAllData()
            }}
          >
            Query
          </button>
        </div>
      </div>
      <div className={styles.column} style={{ gap: '10px', marginBottom: '30px' }}>
        <h3 className={styles.h3}>Events</h3>
        <Select
          controlStyles={{ padding: '4px 0' }}
          isOptionDisabled={(option) => option.value === false}
          isClearable
          onChange={(event: EventInfo) => {
            setEvent(event)
          }}
          placeholder="Select event (optional)"
          options={events}
          components={{ SingleValue: CurrentValue, Option: SelectOption }}
        />
      </div>

      <Chart header={header} isLoading={isLoading} entries={chartData} error={error} />
    </main>
  )
}

export default Events
