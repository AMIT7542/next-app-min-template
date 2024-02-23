"use client";
import {
  Anchor,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Image,
  NavLink,
  Space,
  Text,
} from "@mantine/core";
import styles from "../app/styles/style.module.css";
import {
  IconArrowRight,
  IconAt,
  IconDatabase,
  IconDownload,
  IconPhoneCall,
  IconPhoto,
  IconStar,
  IconTrash,
  IconUserMinus,
  IconUserPlus,
  IconWorld,
} from "@tabler/icons-react";
import { useUserList } from "./CustomeHooks/useUserList";
import { useState } from "react";

export default function HomePage() {
  const { users, error, deleteUser } = useUserList();
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);

  const toggleFollow = (userId: number) => {
    if (followedUsers.includes(userId)) {
      setFollowedUsers(followedUsers.filter((id) => id !== userId));
    } else {
      setFollowedUsers([...followedUsers, userId]);
    }
  };
  if (users.length == 0) {
    return (
      <div>
        <h1>No Data Found....</h1>
      </div>
    );
  }
  const isFollowed = (userId: number) => followedUsers.includes(userId);
  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className={styles.cardContainer}>
          {users.map((user) => (
            <Card
              key={user.id}
              shadow="xl"
              withBorder
              radius="md"
              className={styles.card}
            >
              <div className={styles.imgContainer}>
                <Image
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt="User Avatar"
                />
              </div>
              <Flex gap="xs" align="center" direction="row" justify="center">
                <Text size="lg" style={{ fontWeight: 500 }}>
                  {user.name}
                </Text>
                {isFollowed(user.id) && (
                  <IconStar size={16} strokeWidth={2} color={"black"} />
                )}
              </Flex>

              <Flex
                mih={35}
                gap="xs"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <IconAt
                  size={16}
                  strokeWidth={1.2}
                  className={styles.textcolor}
                />

                <Anchor
                  href={`mailto:${user.email}`}
                  target={user.email}
                  underline="hover"
                  className={styles.textcolor}
                >
                  {user.email}
                </Anchor>
              </Flex>

              <Flex
                mih={3}
                gap="xs"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <IconPhoneCall
                  size={16}
                  strokeWidth={1}
                  className={styles.textcolor}
                />

                <Anchor
                  href="https://mantine.dev/"
                  target={user.phone}
                  underline="hover"
                  className={styles.textcolor}
                >
                  {user.phone}
                </Anchor>
              </Flex>
              <Flex
                mih={35}
                gap="xs"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <IconWorld
                  size={16}
                  strokeWidth={1.5}
                  className={styles.textcolor}
                />

                <Anchor
                  href={`https:${user.website}`}
                  target={user.website}
                  underline="hover"
                  className={styles.textcolor}
                >
                  {user.website}
                </Anchor>
              </Flex>
              <Space h="xs" />
              <Flex
                mih={35}
                gap="xs"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Button
                  variant={isFollowed(user.id) ? "default" : "filled"}
                  leftSection={
                    isFollowed(user.id) ? (
                      <IconUserMinus size={18} strokeWidth={1.5} />
                    ) : (
                      <IconUserPlus size={18} strokeWidth={1.5} />
                    )
                  }
                  className={styles.button}
                  onClick={() => toggleFollow(user.id)}
                >
                  {isFollowed(user.id) ? "Unfollow" : "Follow"}
                </Button>

                <Button
                  variant="outline"
                  leftSection={<IconTrash size={16} strokeWidth={1.5} />}
                  onClick={() => deleteUser(user.id)}
                  className={styles.button}
                >
                  Delete
                </Button>
              </Flex>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
