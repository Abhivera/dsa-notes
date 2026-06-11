class Stack:
    def __init__(self):
        # Initialize an empty list to store stack elements
        self.s = []

    def length(self):
        # Return the number of elements in the stack
        return len(self.s)

    def push(self, value):
        # Insert the new element at index 0.
        # We are treating index 0 as the top of the stack.
        self.s.insert(0, value)

    def peek(self):
        # Return the top element without removing it
        if self.length() == 0:
            raise Exception("Stack is empty")
        return self.s[0]

    def pop(self):
        # Remove and return the top element from the stack
        if self.length() == 0:
            raise Exception("Stack is empty")
        return self.s.pop(0)


# Example Usage
stk = Stack()

# Push elements onto the stack
stk.push(10)
stk.push(20)
stk.push(30)

# View the top element without removing it
print(stk.peek())  # Output: 30

# Remove and return the top element
print(stk.pop())   # Output: 30

# Note: Using insert(0, value) and pop(0) makes both operations O(n) because all elements need to be shifted. A more efficient stack implementation uses the end of the list:

# def push(self, value):
#     self.s.append(value)   # O(1)

# def pop(self):
#     return self.s.pop()    # O(1)

# def peek(self):
#     return self.s[-1]      # O(1)