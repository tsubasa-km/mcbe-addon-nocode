"use client";
import { Box, Grid, Card, Image, Text, Center } from "@mantine/core";
import { useHover } from "@mantine/hooks";

interface Project {
  title: string;
  description: string;
  icon: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "Description 1",
    icon: "https://placehold.jp/200x200.png",
  },
  {
    title: "Project 2",
    description: "Description 2",
    icon: "https://placehold.jp/200x200.png",
  },
  {
    title: "Project 3",
    description: "Description 3",
    icon: "https://placehold.jp/200x200.png",
  },
];

function ProjectComponent({ project }: { project: Project }) {
  const { hovered, ref } = useHover();
  return (
    <Card key={project.title} shadow="md" radius="md" w={200} h={200} withBorder>
      <Card.Section>
        <Image
          ref={ref}
          h={hovered ? 200 : 100}
          src={project.icon}
          alt={project.title}
          style={{ transition: "height 0.3s ease" }}
        />
      </Card.Section>
      {!hovered && (
        <Card.Section>
          <Text size="lg">{project.title}</Text>
          <Text c="dimmed">{project.description}</Text>
        </Card.Section>
      )}
    </Card>
  );
}

export default function Gallery() {

  return (
    <Box>
      <Center style={{ height: "100vh" }}>
        <Grid >
          {projects.map((project, idx) => (
            <ProjectComponent key={idx} project={project} />
          ))}
        </Grid>

      </Center>
    </Box>
  );
}
