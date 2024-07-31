import { Button, Form, InputNumber } from "antd"
import { useMemo, useState } from "react"

export const Problem1 = () => {
  const [form] = Form.useForm()
  const [input, setInput] = useState<null | number>(null)

  const onFinish = (values: any) => {
    setInput(values.input)
  }

  // Dùng vòng for
  const sum_to_n_a = useMemo(() => {
    let total = 0
    if (input) {
      for (let index = 1; index <= input; index++) {
        total += index
      }
    }
    return total
  }, [input])

  const sumN: any = (n: number) => {
    if (n === 0) return 0
    return n + sumN(n - 1)
  }

  // Dùng đệ quy
  const sum_to_n_b = useMemo(() => {
    if (!input) return 0
    return sumN(input)
    // eslint-disable-next-line
  }, [input])

  // Dùng công thức
  const sum_to_n_c = useMemo(() => {
    if (!input) return 0
    return (input * (input + 1)) / 2
  }, [input])

  return (
    <div>
      <h3>Problem 1: Three ways to sum to n</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            name="input"
            label="Nhập n"
            rules={[
              { required: true, message: "Vui lòng nhập số!" },
              { type: "number", min: 1.01, message: "Số phải lớn hơn 1!" },
            ]}>
            <InputNumber
              className="w-[150px]"
              min={1}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          <p>Số đã nhập: {input}</p>
          <p>Cách 1: Dùng vòng for, tên hàm trong code: sum_to_n_a</p>
          <p>Kết quả: {sum_to_n_a}</p>
          <p>Cách 2: Dùng đệ quy, tên hàm trong code: sum_to_n_b</p>
          <p>Kết quả: {sum_to_n_b}</p>
          <p>Cách 3: Dùng công thức s=n*(n+1)/2, tên hàm trong code: sum_to_n_c</p>
          <p>Kết quả: {sum_to_n_c}</p>
        </div>
      </div>
    </div>
  )
}
