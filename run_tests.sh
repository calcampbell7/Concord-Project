#!/bin/bash

passed=0
failed=0

for input_file in tests_2/in*.txt
do
    filename=$(basename "$input_file" .txt)
    test_number=${filename#in}

    expected_file="tests_2/out${test_number}.txt"
    actual_file="/tmp/actual${test_number}.txt"

    if ! python3 concord3.py "$input_file" > "$actual_file"
    then
        echo "Test $test_number: ERROR"
        failed=$((failed + 1))
    elif diff -u "$expected_file" "$actual_file"
    then
        echo "Test $test_number: PASS"
        passed=$((passed + 1))
    else
        echo "Test $test_number: FAIL"
        failed=$((failed + 1))
    fi
done

echo
echo "$passed passed"
echo "$failed failed"