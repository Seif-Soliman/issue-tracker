import { Avatar, Box, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import prisma from "@/prisma/client";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true, //eager loading
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2">
                    <Box>
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    </Box>
                    <Box>
                      <IssueStatusBadge status={issue.status} />
                    </Box>
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      radius="full"
                      size="2"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
