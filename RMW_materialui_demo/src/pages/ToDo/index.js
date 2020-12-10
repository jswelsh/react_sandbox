import React from 'react'
import { ListPage } from 'material-ui-shell/lib/containers/Page'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { useIntl } from 'react-intl'

import list from './data.json'

const fields = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'string'
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'bool',
  },
  {
    name: 'createdTime',
    label: 'Created time',
    type: 'time',
  },
]

const Row = ({ index, style, data }) => {
  const { name, description, createdTime, email } = data

  return (
    <div key={`${name}_${index}`} style={style}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={`${name} ${index}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {description}
              </Typography>
              <br />
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {`${createdTime}`}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
    </div>
  )
}

export default function () {
  const intl = useIntl()

  return (
    <ListPage
      name="list_demo"
      list={list}
      fields={fields}
      Row={Row}
      listProps={{ itemSize: 91 }}
      getPageProps={(list) => {
        return {
          pageTitle: intl.formatMessage(
            {
              id: 'list_page_demo',
              defaultMessage: 'List Page demo with {count} rows',
            },
            { count: list.length }
          ),
        }
      }}
    />
  )
}
