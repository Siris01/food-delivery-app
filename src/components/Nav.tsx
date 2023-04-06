import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem
} from '@mantine/core';
import Logo from '@components/Logo';
import { useDisclosure } from '@mantine/hooks';
import { Hamburger, Oden, Pizza, TakeoutBox, Taco, Croissant } from 'fluent-emoji'
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%'
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
        })
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
        }),

        '&:active': theme.activeStyles
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none'
        }
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none'
        }
    }
}));

const data = [
    {
        icon: Oden,
        title: 'Indian',
        description: 'With its complex spice blends and diverse array of vegetarian and non-vegetarian dishes, this cuisine offers a wealth of bold, flavorful options.',
    },
    {
        icon: Pizza,
        title: 'Italian',
        description: 'This cuisine is known for its comforting, hearty dishes that often feature fresh tomatoes, aromatic herbs, and creamy cheeses.',
    },
    {
        icon: Taco,
        title: 'Mexican',
        description: 'With its complex spice blends and diverse array of vegetarian and non-vegetarian dishes, this cuisine offers a wealth of bold, flavorful options.',
    },
    {
        icon: TakeoutBox,
        title: 'Chinese',
        description: 'With a focus on balance and harmony, this cuisine blends sweet, sour, salty, and umami flavors to create dishes that are both satisfying and nuanced.'
    },
    {
        icon: Hamburger,
        title: 'American',
        description: 'From classic burgers and fries to regional specialties like barbecue and seafood, this cuisine is diverse and varied, with a focus on hearty, comforting fare.'
    },
    {
        icon: Croissant,
        title: 'French',
        description: 'Known for its rich, buttery flavors and decadent desserts, this cuisine features a wide range of savory dishes that highlight the beauty of simple ingredients cooked to perfection.'
    }
];

export default function Nav() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    const links = data.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align='flex-start'>
                <ThemeIcon size={34} variant='default' radius='md'>
                    <item.icon />
                </ThemeIcon>
                <Link href={`/order?cuisine=${item.title.toLowerCase()}`}>
                    <Text size='sm' fw={500}>
                        {item.title}
                    </Text>
                    <Text size='xs' color='dimmed'>
                        {item.description}
                    </Text>
                </Link>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={120}>
            <Header height={60} px='md'>
                <Group position='apart' sx={{ height: '100%' }}>
                    <Group sx={{ height: '100%' }} spacing={8}>
                        <Logo size={48} />
                        <span>FDA</span>
                    </Group>

                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <a href='#' className={classes.link}>
                            Home
                        </a>
                        <HoverCard width={600} position='bottom' radius='md' shadow='md' withinPortal>
                            <HoverCard.Target>
                                <a href='#' className={classes.link}>
                                    <Center inline>
                                        <Box component='span' mr={5}>
                                            Features
                                        </Box>
                                        <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                                <Group position='apart' px='md'>
                                    <Text fw={500}>Features</Text>
                                    <Anchor href='#' fz='xs'>
                                        View all
                                    </Anchor>
                                </Group>

                                <Divider my='sm' mx='-md' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group position='apart'>
                                        <div>
                                            <Text fw={500} fz='sm'>
                                                Get started
                                            </Text>
                                            <Text size='xs' color='dimmed'>
                                                Their food sources have decreased, and their numbers
                                            </Text>
                                        </div>
                                        <Button variant='default'>Get started</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <a href='#' className={classes.link}>
                            Learn
                        </a>
                        <a href='#' className={classes.link}>
                            Academy
                        </a>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <Button variant='default'>Log in</Button>
                        <Button>Sign up</Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size='100%'
                padding='md'
                title='Navigation'
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx='-md'>
                    <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <a href='#' className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component='span' mr={5}>
                                Features
                            </Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href='#' className={classes.link}>
                        Learn
                    </a>
                    <a href='#' className={classes.link}>
                        Academy
                    </a>

                    <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position='center' grow pb='xl' px='md'>
                        <Button variant='default'>Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
