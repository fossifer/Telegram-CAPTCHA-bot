import random


class Challenge:
    def __init__(self):
        self._a = 0
        self._b = 0
        self._op = '+'
        self._ans = 0
        self._choices = []
        self.new()

    def __str__(self):
        return '{a}{op}{b}=?'.format(a=self._a, b=self._b, op=self._op)

    def new(self):
        operation = random.choice(['+', '-', '×', '÷'])
        a, b, ans = 0, 0, 0
        if operation in ['+', '-']:
            a, b = random.randint(0, 50), random.randint(0, 50)
            a, b = max(a, b), min(a, b)
            ans = a+b if operation == '+' else a-b
        elif operation == '×':
            a, b = random.randint(0, 9), random.randint(0, 9)
            ans = a*b
        elif operation == '÷':
            a, b = random.randint(0, 9), random.randint(1, 9)
            ans = a
            a = a*b

        cases = 6
        choices = random.sample(range(100), cases)
        if ans not in choices:
            choices[0] = ans
        random.shuffle(choices)
        # Some bots just blindly click the first button
        if choices[0] == ans:
            choices[0], choices[1] = choices[1], choices[0]

        self._a, self._b = a, b
        self._op = operation
        self._ans = ans
        self._choices = choices

    def qus(self):
        return self.__str__()

    def ans(self):
        return self._ans

    def choices(self):
        return self._choices