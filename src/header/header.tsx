"use client";
import React, { memo } from "react";
import { Button, Flex, Menu, Kbd } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export type MenuItem = {
    name: string;
    shortcut?: string[];
} & (
        | { subMenu: MenuItem[][]; onClick?: never }
        | { onClick: () => void; subMenu?: never }
    );

export const menuItems: MenuItem[] = [
    {
        name: "File",
        subMenu: [
            [
                { name: "New", shortcut: ["⌘", "N"], onClick: () => console.log("New") },
                { name: "Open", shortcut: ["⌘", "O"], onClick: () => console.log("Open") },
                { name: "Save", shortcut: ["⌘", "S"], onClick: () => console.log("Save") },
                { name: "Save As", shortcut: ["⌘", "Shift", "S"], onClick: () => console.log("Save As") },
            ],
            [
                { name: "Settings", shortcut: ["⌘", ","], onClick: () => console.log("Settings") },
            ],
            [
                { name: "Exit", shortcut: ["⌘", "Q"], onClick: () => console.log("Exit") },
            ]
        ],
    },
    {
        name: "Edit",
        subMenu: [[
            { name: "Undo", shortcut: ["⌘", "Z"], onClick: () => console.log("Undo") },
            { name: "Redo", shortcut: ["⌘", "Shift", "Z"], onClick: () => console.log("Redo") },
            { name: "Cut", shortcut: ["⌘", "X"], onClick: () => console.log("Cut") },
            { name: "Copy", shortcut: ["⌘", "C"], onClick: () => console.log("Copy") },
            { name: "Paste", shortcut: ["⌘", "V"], onClick: () => console.log("Paste") },
        ]],
    },
    {
        name: "View",
        subMenu: [[
            { name: "Zoom In", shortcut: ["⌘", "="], onClick: () => console.log("Zoom In") },
            { name: "Zoom Out", shortcut: ["⌘", "-"], onClick: () => console.log("Zoom Out") },
            { name: "Full Screen", shortcut: ["Ctrl", "⌘", "F"], onClick: () => console.log("Full Screen") },
        ]],
    },
    {
        name: "Help",
        subMenu: [[
            { name: "Documentation", onClick: () => console.log("Documentation") },
            { name: "Report Issue", onClick: () => console.log("Report Issue") },
            {
                name: "About",
                subMenu: [[
                    { name: "Version", onClick: () => console.log("Version") },
                    { name: "License", onClick: () => console.log("License") },
                ]],
            },
        ]],
    }
];

interface MenuItemComponentProps {
    item: MenuItem;
    depth?: number;
}

const renderShortcut = (keys: string[]) => (
    <span style={{ marginLeft: "3rem" }}>
        {keys.map((key, index) => (
            <React.Fragment key={index}>
                <Kbd>{key}</Kbd>
                {index !== keys.length - 1 && " + "}
            </React.Fragment>
        ))}
    </span>
);

const MenuItemComponent: React.FC<MenuItemComponentProps> = memo(({ item, depth = 0 }) => {

    const renderButton = () => (
        <Button
            className="menu-btn"
            variant="default"
            size="compact-sm"
            px="1.5em"
            radius={5}
            onClick={item.onClick}
            aria-label={item.name}
        >
            <span>{item.name}</span>
            {item.shortcut && renderShortcut(item.shortcut)}
        </Button>
    );


    if (!item.subMenu) {
        return depth === 0 ? (
            renderButton()
        ) : (
            <Menu.Item
                onClick={item.onClick}
                aria-label={item.name}
                rightSection={item.shortcut ? renderShortcut(item.shortcut) : undefined}
            >
                {item.name}
            </Menu.Item>
        );
    }


    const targetElement =
        depth === 0 ? (
            renderButton()
        ) : (
            <Menu.Item
                rightSection={<IconChevronRight size="1em" />}
                aria-label={item.name}
            >
                {item.name}
            </Menu.Item>
        );

    return (
        <Menu
            trigger={depth > 0 ? "hover" : "click"}
            openDelay={100}
            closeDelay={200}
            position={depth === 0 ? "bottom-start" : "right-start"}
            offset={0}
            withinPortal
        >
            <Menu.Target>{targetElement}</Menu.Target>
            <Menu.Dropdown>
                {item.subMenu.map((group, groupIndex) => (
                    <React.Fragment key={`${item.name}-${depth}-${groupIndex}`}>
                        {group.map((subItem, index) => (
                            <MenuItemComponent
                                key={`${item.name}-${depth}-${groupIndex}-${index}`}
                                item={subItem}
                                depth={depth + 1}
                            />
                        ))}
                        {groupIndex !== item.subMenu.length - 1 && <Menu.Divider />}
                    </React.Fragment>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
});
MenuItemComponent.displayName = "MenuItemComponent";

export default function Header() {
    return (
        <Flex className="header" gap="1" px="1.5em">
            {menuItems.map((item, index) => (
                <MenuItemComponent key={`${item.name}-${index}`} item={item} />
            ))}
        </Flex>
    );
}
