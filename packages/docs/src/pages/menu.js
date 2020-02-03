import React from 'react'
import { ThemeProvider, Link, Menu } from 'react-ui'
import {
  Table,
  Page,
  Section,
  Props,
  Badge,
  Example,
  Paragraph
} from '../components'

const Documentation = () => {
  return (
    <Page
      title="Menu"
      tagline="Use Menu to "
      badges={[<Badge key={0}>accessible</Badge>]}
    >
      <Paragraph>
        Extends{' '}
        <Link
          href="https://reacttraining.com/reach-ui/menu-button"
          target="_blank"
        >
          reach-ui/menu
        </Link>
        .
      </Paragraph>
      <Example>
        <Example.Preview>
          <Menu>
            <Menu.Button>Home</Menu.Button>
            <Menu.List>
              <Menu.Item onSelect={_ => _}>Home</Menu.Item>
              <Menu.Item onSelect={_ => _}>Search</Menu.Item>
              <Menu.Item onSelect={_ => _}>Trending</Menu.Item>
              <Menu.Item onSelect={_ => _}>Lists</Menu.Item>
            </Menu.List>
          </Menu>
        </Example.Preview>
        <Example.Code>
          {`
            <Menu>
              <Menu.Button>Home</Menu.Button>
              <Menu.List>
                <Menu.Item onSelect={onSelect}>Home</Menu.Item>
                <Menu.Item onSelect={onSelect}>Search</Menu.Item>
                <Menu.Item onSelect={onSelect}>Trending</Menu.Item>
                <Menu.Item onSelect={onSelect}>Lists</Menu.Item>
              </Menu.List>
            </Menu>
          `}
        </Example.Code>
      </Example>

      <Section title="Props: Menu">
        <Props
          props={[
            {
              name: 'children',
              type: 'Menu.Button and Menu.List',
              description: '',
              default: ''
            }
          ]}
        />
      </Section>

      <Section title="Props: Menu.Button">
        <Paragraph>
          Extends <Link href="/component/Button">Button</Link>
        </Paragraph>
        <Props
          props={[
            {
              name: '+',
              type: 'props of Button',
              description: '',
              default: 'variant: "secondary"'
            }
          ]}
        />
      </Section>

      <Section title="Props: Menu.List">
        <Props
          props={[
            {
              name: 'children',
              type: '[ Menu.Item ]',
              description: ''
            }
          ]}
        />
      </Section>

      <Section title="Props: Menu.Item">
        <Props
          props={[
            {
              name: 'onSelect',
              type: 'function',
              description: '',
              required: true
            },
            {
              name: 'children',
              type: '[ React elements ]',
              description: ''
            }
          ]}
        />
      </Section>

      <Section title="Customisation">
        <Paragraph>Menu has the following customisable elements:</Paragraph>

        <Table>
          <Table.Header>Name</Table.Header>
          <Table.Row>Button</Table.Row>
          <Table.Row>MenuList</Table.Row>
          <Table.Row>MenuItem</Table.Row>
        </Table>

        <Paragraph>
          Read more about <Link href="/todo">customizing components</Link> here.
        </Paragraph>

        <Example>
          <Example.Code lang="js">{`
          const components = {
            MenuList: {
              width: 200
            },
            MenuItem: {
              '&[data-selected]': {
                backgroundColor: 'greens.700',
                color: 'white'
              }
            }
          }
        `}</Example.Code>
          <Example.Code lang="jsx">{`
          <ThemeProvider components={components}>
            <Menu>
              <Menu.Button variant="primary">Home</Menu.Button>
              <Menu.List>
                <Menu.Item onSelect={_ => {}}>Home</Menu.Item>
                <Menu.Item onSelect={_ => {}}>Search</Menu.Item>
                <Menu.Item onSelect={_ => {}}>Trending</Menu.Item>
                <Menu.Item onSelect={_ => {}}>Lists</Menu.Item>
              </Menu.List>
            </Menu>
          </ThemeProvider>
        `}</Example.Code>
          <Example.Preview>
            <ThemeProvider
              components={{
                MenuList: {
                  width: 200
                },
                MenuItem: {
                  '&[data-selected]': {
                    backgroundColor: 'greens.700',
                    color: 'white'
                  }
                }
              }}
            >
              <Menu>
                <Menu.Button variant="primary">Home</Menu.Button>
                <Menu.List>
                  <Menu.Item onSelect={_ => {}}>Home</Menu.Item>
                  <Menu.Item onSelect={_ => {}}>Search</Menu.Item>
                  <Menu.Item onSelect={_ => {}}>Trending</Menu.Item>
                  <Menu.Item onSelect={_ => {}}>Lists</Menu.Item>
                </Menu.List>
              </Menu>
            </ThemeProvider>
          </Example.Preview>
        </Example>
      </Section>
    </Page>
  )
}

export default Documentation