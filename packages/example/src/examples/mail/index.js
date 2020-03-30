import React from 'react'
import { Dropdown } from 'react-ui'
import {
  Form,
  Text,
  Avatar,
  Input,
  Textarea,
  Select,
  Link,
  Switch,
  Button,
  Grid,
  Column,
  Breadcrumb,
  Stack,
  Menu,
  ThemeProvider,
  Element
} from 'react-ui'
import { Sidebar, Badge } from './sidebar'

import './style.css'
import theme from './theme.js'
import { emails } from './dummyData'

const Messages = ({ messages }) =>
  messages.map(message => (
    <Grid css={{ marginBottom: '1.5em !important' }}>
      <Column span={1}>
        {message.star && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 240 240"
            width="1.5em"
            height="1.5em"
          >
            <path fill="#F8D64E" d="m48,234 73-226 73,226-192-140h238z" />
          </svg>
        )}
      </Column>
      <Column span={[10, 2, 2]}>
        <Text>{message.from}</Text>
      </Column>
      <Column span={[1, 0, 0]}>
        <Text>{message.date}</Text>
      </Column>

      <Column span={[12, 8, 8]}>
        <Text>{message.subject} - </Text>
        <Text color="text.subtle">{message.preview}</Text>
      </Column>
      <Column span={[0, 1, 1]}>12/20/19</Column>
    </Grid>
  ))

function App() {
  const [selectedLabel, selectLabel] = React.useState('Inbox')

  const options = emails.map((email, index) => ({
    value: index,
    label: email.subject
  }))

  const autocompleteProvider = value => {
    return options.filter(option =>
      option.label.toLowerCase().includes(value.toLowerCase())
    )
  }

  return (
    <ThemeProvider theme={theme} designMode>
      <Grid>
        <Column span={[12, 12, 2]}>
          <Sidebar>
            <Stack
              justify="center"
              marginBottom={4}
              css={{ display: ['none', 'none', 'flex'] }}
            >
              <Avatar
                src="https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg"
                size="large"
              />
            </Stack>

            <Sidebar.Item
              selected={selectedLabel === 'Inbox'}
              onClick={() => selectLabel('Inbox')}
            >
              <span>Inbox</span> <Badge>1</Badge>
            </Sidebar.Item>
            <Sidebar.Item
              selected={selectedLabel === 'Starred'}
              onClick={() => selectLabel('Starred')}
            >
              <span>Starred</span> <Badge variant="starred">5</Badge>
            </Sidebar.Item>
            <Sidebar.Item
              selected={selectedLabel === 'Sent'}
              onClick={() => selectLabel('Sent')}
            >
              <span>Sent</span> <Badge variant="sent">50</Badge>
            </Sidebar.Item>
            <Sidebar.Item
              selected={selectedLabel === 'Spam'}
              onClick={() => selectLabel('Spam')}
            >
              <span>Spam</span> <Badge variant="spam">200</Badge>
            </Sidebar.Item>

            <Stack
              justify="space-between"
              css={{ display: ['flex', 'flex', 'none'], paddingX: 4 }}
            >
              <Menu>
                <Menu.Button>{selectedLabel}</Menu.Button>
                <Menu.List>
                  <Menu.Item onSelect={() => selectLabel('Inbox')}>
                    <Stack as={Link} justify="space-between">
                      <span>Inbox</span> <Badge>1</Badge>
                    </Stack>
                  </Menu.Item>
                  <Menu.Item onSelect={() => selectLabel('Starred')}>
                    <Stack as={Link} justify="space-between">
                      <span>Starred</span> <Badge variant="starred">5</Badge>
                    </Stack>
                  </Menu.Item>
                  <Menu.Item onSelect={() => selectLabel('Sent')}>
                    <Stack as={Link} justify="space-between">
                      <span>Sent</span> <Badge variant="sent">50</Badge>
                    </Stack>
                  </Menu.Item>
                  <Menu.Item onSelect={() => selectLabel('Spam')}>
                    <Stack as={Link} justify="space-between">
                      <span>Spam</span> <Badge variant="spam">200</Badge>
                    </Stack>
                  </Menu.Item>
                </Menu.List>
              </Menu>

              <Avatar
                src="https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg"
                alt="user avatar"
                size="small"
              />
            </Stack>
          </Sidebar>
        </Column>

        <Column
          span={[12, 12, 10]}
          style={{ backgroundColor: 'App.background' }}
        >
          <Element
            style={{
              height: '100vh',
              paddinY: [5, 5, 10],
              paddingX: [5, 5, 10],
              color: 'text.body'
            }}
          >
            <Breadcrumb marginBottom={3}>
              <Link href="/home">Home</Link>
              <span>{selectedLabel}</span>
            </Breadcrumb>

            <Dropdown
              options={options}
              autocompleteProvider={autocompleteProvider}
              showOptionsOnFocus={true}
              css={{ marginBottom: '2em !important' }}
            />

            <Stack direction="vertical">
              <Messages messages={emails} />
            </Stack>
          </Element>
        </Column>
      </Grid>
    </ThemeProvider>
  )
}

export default App
// <Form>
//               <Form.Header as="h2">Update profile details</Form.Header>
//               <Form.Field label="Full name" isRequired>
//                 <Input placeholder="Enter your username" />
//               </Form.Field>
//               <Form.Field label="Email">
//                 <Input placeholder="Enter your email" />
//               </Form.Field>
//               <Form.Field label="Change password">
//                 <Input placeholder="Enter a password" />
//               </Form.Field>
//               <Form.Field label="Weather">
//                 <Select>
//                   <option value="">What's the weather like?</option>
//                   <option value="hot">Hot</option>
//                   <option value="cold">Cold</option>
//                 </Select>
//               </Form.Field>
//               <Form.Field label="Change password">
//                 <Textarea placeholder="Enter a password" />
//               </Form.Field>
//               <Form.Field label="Remember me">
//                 <Switch />
//               </Form.Field>
//               <Element marginX={6} marginBottom={2}>
//                 <Button>Update profile</Button>
//               </Element>
//             </Form>
