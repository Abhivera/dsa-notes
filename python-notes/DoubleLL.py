class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class DoublyLinkedList:

    def __init__(self):
        self.head = None

    # Insert at beginning
    def insertAtBeg(self, value):

        temp = Node(value)

        # Empty list
        if self.head is None:
            self.head = temp
            return

        temp.next = self.head
        self.head.prev = temp

        self.head = temp

    # Insert at end
    def insertAtEnd(self, value):

        temp = Node(value)

        # Empty list
        if self.head is None:
            self.head = temp
            return

        t1 = self.head

        while t1.next:
            t1 = t1.next

        t1.next = temp
        temp.prev = t1

    # Delete a node by value
    def delete(self, value):

        if self.head is None:
            return

        t1 = self.head

        # Delete head
        if t1.data == value:

            self.head = t1.next

            if self.head:
                self.head.prev = None

            return

        while t1:

            if t1.data == value:

                # Connect previous node to next node
                if t1.prev:
                    t1.prev.next = t1.next

                # Connect next node to previous node
                if t1.next:
                    t1.next.prev = t1.prev

                return

            t1 = t1.next

    # Print forward
    def printForward(self):

        t1 = self.head

        while t1:
            print(t1.data, end=" <-> ")
            t1 = t1.next

        print("None")

    # Print backward
    def printBackward(self):

        if self.head is None:
            return

        t1 = self.head

        # Go to last node
        while t1.next:
            t1 = t1.next

        # Traverse backwards
        while t1:
            print(t1.data, end=" <-> ")
            t1 = t1.prev

        print("None")