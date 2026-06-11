# Node class represents a single node in the linked list
class Node:
    def __init__(self, info, next=None):
        self.data = info      # Store the value
        self.next = next      # Store reference to next node


class SinglyLinkedList:

    def __init__(self, head=None):
        self.head = head      # First node of the linked list

    # Insert a node at the end of the list
    def insertAtEnd(self, value):

        # Create new node
        temp = Node(value)

        # Case 1: Linked List is NOT empty
        if self.head != None:

            # Start traversal from head
            t1 = self.head

            # Move until last node
            while t1.next != None:
                t1 = t1.next

            # Attach new node to last node
            t1.next = temp

        # Case 2: Linked List is empty
        else:
            self.head = temp

    # Insert at beginning
    def insertAtBeg(self, value):

        # Create new node
        temp = Node(value)

        # New node points to current head
        temp.next = self.head

        # Update head to new node
        self.head = temp

    # Insert after a given value x
    def insertInMid(self, value, x):

        temp = Node(value)

        # Start from head
        t1 = self.head

        while t1.next != None:

            # If value x found
            if t1.data == x:

                # New node points to next node
                temp.next = t1.next

                # Current node points to new node
                t1.next = temp

                # Stop after insertion
                break

            t1 = t1.next

    # Delete a node containing value
    def deleteLL(self, value):

        t1 = self.head
        prev = t1

        # Case 1: Head itself contains value
        if t1.data == value:
            self.head = t1.next
            return

        # Traverse list
        while t1.next != None:

            # Node found
            if t1.data == value:
                prev.next = t1.next
                break

            # Move both pointers
            else:
                prev = t1
                t1 = t1.next

        # Case 2: Last node contains value
        if t1.data == value:
            prev.next = None
            return

    # Print linked list
    def printLL(self):

        t1 = self.head

        # Traverse till second-last node
        while t1.next != None:
            print(t1.data)
            t1 = t1.next

        # Print last node
        print(t1.data)


# Create empty linked list
obj = SinglyLinkedList()

# Insert at end
obj.insertAtEnd(10)
# List: 10

obj.insertAtEnd(20)
# List: 10 -> 20

obj.insertAtEnd(30)
# List: 10 -> 20 -> 30

# Insert at beginning
obj.insertAtBeg(5)
# List: 5 -> 10 -> 20 -> 30

obj.printLL()