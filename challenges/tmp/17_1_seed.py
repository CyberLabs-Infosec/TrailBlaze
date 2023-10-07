from random import seed, shuffle
from flag import FLAG

seed(0x1337)

flag_list = list(FLAG)
shuffle(flag_list)

shuffled_flag = ''
for i in range(len(FLAG)):
    shuffled_flag += flag_list[i].encode().hex()

print(f"Modified flag is: {shuffled_flag}")

# Modified flag is: 626c617a657b7233377231337633316e675f3768655f666c307733725f7734735f7233346c6c795f64346e6733723075735f7337316c6c5f77316633795f77316c6c5f62335f68347070795f4b696d62562e6358364f7d