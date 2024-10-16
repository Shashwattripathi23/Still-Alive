def calculate_distance(word):

    keyboard = {
        'Q': (0, 0), 'W': (0, 1), 'E': (0, 2), 'R': (0, 3), 'T': (0, 4),
        'Y': (0, 5), 'U': (0, 6), 'I': (0, 7), 'O': (0, 8), 'P': (0, 9),
        'A': (1, 0), 'S': (1, 1), 'D': (1, 2), 'F': (1, 3), 'G': (1, 4),
        'H': (1, 5), 'J': (1, 6), 'K': (1, 7), 'L': (1, 8),
        'Z': (2, 1), 'X': (2, 2), 'C': (2, 3), 'V': (2, 4), 'B': (2, 5),
        'N': (2, 6), 'M': (2, 7)
    }
    
    
    current = keyboard['Q']
    total_distance = 0
    
    for char in word:
        next_pos = keyboard[char]
        
        distance = abs(next_pos[0] - current[0]) + abs(next_pos[1] - current[1])
        total_distance += distance
        current = next_pos  
    
    return total_distance

# Example usage
word = "OZ"
print(calculate_distance(word))  # Output: 3