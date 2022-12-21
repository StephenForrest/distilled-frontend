import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from 'app/components/PageHeader';
import { VStack, HStack, Box } from '@chakra-ui/react';
import { GET_ACTION_SUCCESS_CRITERIAS } from 'app/lib/queries/Plan';
import { useQuery } from '@apollo/client';
import Category from './Category';
import { DragDropContext } from 'react-beautiful-dnd';
import Loader from 'app/components/Loader';
import TaskFilters from 'app/pages/ActionsPage/Filters';
import fuzzysort from 'fuzzysort';

const categories = [
  { id: 'todo', title: 'To do' },
  { id: 'ongoing', title: 'On going' },
  { id: 'done', title: 'done' },
];

export function ActionPage() {
  const [search, setSearch] = useState<string>('');
  const [items, setItems] = useState<{ [key: string]: unknown[] }>({
    todo: [],
    ongoing: [],
    done: [],
  });
  const { data, loading } = useQuery(GET_ACTION_SUCCESS_CRITERIAS, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data?.getActionSuccessCriterias) {
      let organiseByCategory = {
        todo: [],
        ongoing: [],
        done: [],
      };
      data?.getActionSuccessCriterias.forEach(sc => {
        organiseByCategory[sc.kanbanCategory].push(sc);
      });
      setItems(organiseByCategory);
    } else {
      setItems({
        todo: [],
        ongoing: [],
        done: [],
      });
    }
  }, [data]);

  const onDragEnd = result => {
    const organiseByCategory = {
      todo: [...items['todo']],
      ongoing: [...items['ongoing']],
      done: [...items['done']],
    };
    const source = {
      ...organiseByCategory[result.source.droppableId][result.source.index],
    };

    if (result.destination.droppableId === result.source.droppableId) {
      const destination = {
        ...organiseByCategory[result.destination.droppableId][
          result.destination.index
        ],
      };
      organiseByCategory[result.destination.droppableId][
        result.destination.index
      ] = source;
      organiseByCategory[result.destination.droppableId][result.source.index] =
        destination;
    } else {
      organiseByCategory[result.source.droppableId].splice(
        result.source.droppableId,
        1,
      );

      organiseByCategory[result.destination.droppableId].splice(
        result.destination.index,
        0,
        source,
      );
    }
    setItems(organiseByCategory);
  };

  if (loading) {
    return (
      <Box p={10}>
        <Loader size={8} />
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tasks</title>
        <meta name="description" content="Distilled Tasks" />
      </Helmet>
      <PageHeader text={'Tasks'} />
      <TaskFilters search={search} setSearch={setSearch} />
      <VStack
        h={'calc(100% - 100px)'}
        w={'100%'}
        p={8}
        pt={4}
        alignItems={'flex-start'}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <HStack
            h={'100%'}
            w={'100%'}
            minWidth={`${280 * (categories.length + 1)}px`}
            overflowX={'auto'}
            overflowY={'hidden'}
            gap={2}
          >
            <Category actions={items['todo']} category={'todo'} />
            <Category actions={items['ongoing']} category={'ongoing'} />
            <Category actions={items['done']} category={'done'} />
            <Category actions={[]} category={'backlog'} />
          </HStack>
        </DragDropContext>
      </VStack>
    </>
  );
}
